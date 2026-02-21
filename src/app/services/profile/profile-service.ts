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

  // Get current user profile
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

  // Update user profile
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
}
