import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError } from 'rxjs';
import { User } from '../../core/models/user.model';
import { Upgrade } from '../../core/models/upgrade.model';
import { apiEndpoint } from '../constraint';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${apiEndpoint.UserEndPoint.addUser}`, user);
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('token');
    console.log('Using token:', token); // Log token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(`${apiEndpoint.UserEndPoint.getUserById}/${id}`, { headers });
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<User>(`${apiEndpoint.UserEndPoint.updateUser}/${user.id}`, user, { headers });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiEndpoint.UserEndPoint.getAllUsers}`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${apiEndpoint.UserEndPoint.deleteUser}/${userId}`);
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
