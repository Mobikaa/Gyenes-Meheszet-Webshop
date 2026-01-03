import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl,
      { email, password }
    );
  }
}
