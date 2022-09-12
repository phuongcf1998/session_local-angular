import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private API_URL = 'http://localhost:3000';
  logOutNotification = new Subject<string>();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      `${this.API_URL}/login`,
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile/${userName}`);
  }

  signUp(
    username: string,
    password: string,
    email: string
  ): Observable<Object> {
    let result: Observable<Object>;
    email === ''
      ? (result = this.http.post<Object>(
          `${this.API_URL}/signup`,
          {
            username,
            password,
          },
          this.httpOptions
        ))
      : (result = this.http.post<Object>(
          `${this.API_URL}/signup`,
          {
            username,
            password,
            email,
          },
          this.httpOptions
        ));

    return result;
  }

  updateUserInfo(
    username: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<Object> {
    return this.http.post<User>(
      `${this.API_URL}/profile/${username}`,
      {
        firstName,
        lastName,
        password,
      },
      this.httpOptions
    );
  }
}
