import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkTokenOnInit());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  private checkTokenOnInit(): boolean {
    return !!sessionStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.http.post(this.apiUrl,
      { email, password }
    );
  }

  setLoginStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}

