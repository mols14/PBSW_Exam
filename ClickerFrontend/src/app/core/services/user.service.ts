import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${apiEndpoint.UserEndPoint.getUserById}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${apiEndpoint.UserEndPoint.getAllUsers}`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${apiEndpoint.UserEndPoint.deleteUser}/${userId}`);
  }
}
