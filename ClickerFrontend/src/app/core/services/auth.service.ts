import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { apiEndpoint } from '../constraint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) {
    this.loggedInStatus = !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${apiEndpoint.AuthEndPoint.login}`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          const token: string = response.token.Value;
          console.log('Token received:', token); // Log token
          console.log(response)
          localStorage.setItem('token', token); // Store the token as a string
          this.loggedInStatus = true;
        }
      }),
      catchError(this.handleError)
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${apiEndpoint.AuthEndPoint.register}`, { username, email, password }).pipe(
      catchError(this.handleError)
    );
  }

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${apiEndpoint.AuthEndPoint.validateToken}`, { headers: headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInStatus = false;
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.error && error.error.error) {
        // Use the error message from the backend response
        errorMessage = `Error: ${error.error.error}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    console.error(errorMessage); // Log error to console
    return throwError(errorMessage);
  }
}
