import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number, token: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  updateUserProfile(userId: number, user: Partial<User>, token: string): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${userId}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getUserOrders(token: string): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/profile/orders',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
