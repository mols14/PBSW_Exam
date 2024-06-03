// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDto } from '../DTOs/register.dto';
import { LoginDto } from '../DTOs/login.dto';
import { apiEndpoint } from '../constraint';

@Injectable({
  providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginData: LoginDto): Observable<any> {
    return this.http.post(`${apiEndpoint.AuthEndPoint.login}`, loginData, { responseType: 'text' });
  }

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post(`${apiEndpoint.AuthEndPoint.register}`, registerData, { responseType: 'text' });
  }

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${apiEndpoint.AuthEndPoint.validateToken}`, { headers: headers, responseType: 'text' });
  }
}
