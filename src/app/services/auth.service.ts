import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + '/login_user';
  signUpUrl = environment.apiUrl + '/register_user';
  constructor(private _http: HttpClient, private _router: Router) {
    console.log('Base URL:', environment.apiUrl);
  }
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.';
  // baseUrl = environment.baseUrl + '/login_user';
  // signUpUrl = environment.baseUrl + '/register_user';
  // login(requestPayload: Login): Observable<LoginResponse> {
  //   return this._http.post<LoginResponse>(this.baseUrl, requestPayload);
  // }
  login(requestPayload: Login): Observable<logResponse> {
    console.log('Logging in using:', this.baseUrl);
    return this._http.post<logResponse>(this.baseUrl, requestPayload).pipe(
      map((response: logResponse) => {
        if (response && response.token && response.data) {
          this.setLoggedInUserDetails({
            token: response.token,
            user: response.data,
          });
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  // createUser(requestPayload: singUp): Observable<signUpResponse> {
  //
  //   return this._http.post<signUpResponse>(this.signUpUrl, requestPayload);
  // }
  createUser(requestPayload: singUp): Observable<signUpResponse> {
    console.log('singing in using:', this.signUpUrl);
    return this._http.post<signUpResponse>(this.signUpUrl, requestPayload).pipe(
      map((response: signUpResponse) => {
        if (response.success) {
          //
          //
          // Store token and user data in localStorage
          // this.setLoggedInUserDetails({
          //   token: response.token,
          //   user: response.data,
          // });
        }
        return response;
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(error);
      })
    );
  }
  // login(formValue: Login): Observable<LoginResponse> {
  //   const user = this.staticUser.find((user) => user.email === formValue.email && user.password === formValue.password);
  //   if (user) {
  //     const response: LoginResponse = {
  //       statusCode: 200,
  //       message: 'Login successful',
  //       payload: {
  //         access_token: this.token,
  //         user_info: {
  //           id: 1,
  //           name: 'abc',
  //           email: user.email,
  //           role: user.role
  //         },
  //       },
  //     };
  //     return of(response);
  //   } else {
  //     return throwError(() => new Error('Invalid credentials'));
  //   }
  // }
  setLoggedInUserDetails(defaultUser: any) {
    localStorage.setItem('LoggedInUser', JSON.stringify(defaultUser));
  }
  getAuthToken() {
    const data = localStorage.getItem('LoggedInUser');
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData.token; // Retrieve the token
    }
    return null;
  }
  getUserInfo() {
    const data = localStorage.getItem('LoggedInUser');
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData; // Retrieve user info
    }
    return null;
  }
  // getUserInfo() {
  //   const data = localStorage.getItem('LoggedInUser');
  //   if (data) {
  //     const user: LoginPayload = JSON.parse(data);
  //     return user.user;
  //   } else {
  //     return null;
  //   }
  // }
}
export interface LoggedInUser {
  access_token: string;
  user_info: UserInfo;
}
export interface singUp {
  password: string;
  email?: string;
  name?: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}
export interface Login {
  password: string;
  email?: string;
  username?: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}
export interface logResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
    reg_time: string;
  };
  token: string;
}
export interface signUpResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
    reg_time: string;
  };
  token: string;
}
export interface LoginResponse {
  statusCode: number;
  message: string;
  payload: LoginPayload;
  content: LoginPayload;
  token: string;
}
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role?: string;
  role_name?: string;
  company_id?: string;
}
export interface LoginPayload {
  access_token: string;
  user: UserInfo;
}
