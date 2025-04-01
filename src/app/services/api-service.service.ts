// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiServiceService {

//   constructor() { }
// }

import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  // baseUrl = 'https://ecommerce-api-ojn7.onrender.com';
  // baseUrl = environment.baseUrl;
  baseUrl = 'http://localhost:1517/';
  constructor(private _httpclient: HttpClient) {}

  post(url: string, data?: any) {
    const httpOptions = this.getHttpHeader();
    return this._httpclient
      .post(this.baseUrl + url, data, httpOptions)
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          (error: any) => {}
        )
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(response);
        })
      );
  }

  uploadFile(url: string, data?: any, isFileUpload: boolean = false) {
    let httpOptions: any = this.getHttpHeader();

    // ⚡ File Upload ke liye headers remove kar do
    if (isFileUpload) {
      httpOptions = {}; // Browser automatically set karega
    }

    return this._httpclient.post(this.baseUrl + url, data, httpOptions).pipe(
      map((response: any) => response),
      catchError((response) => {
        this.errorHandlerForHttpRequest(response);
        return of(response);
      })
    );
  }

  put(url: string, data?: any) {
    const httpOptions = this.getHttpHeader();
    return this._httpclient
      .put(this.baseUrl + url, data, httpOptions)
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          (error: any) => {}
        )
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(response);
        })
      );
  }

  get(url: string, params?: any) {
    const httpOptions = {
      ...this.getHttpHeader(),
      params: params, // Attach query params here
    };

    return this._httpclient.get(this.baseUrl + url, httpOptions).pipe(
      map((response: any) => response),
      catchError((response) => {
        this.errorHandlerForHttpRequest(response);
        return of(response);
      })
    );
  }

  delete(url: string) {
    const httpOptions = this.getHttpHeader(); // Attach headers if needed

    return this._httpclient.delete(this.baseUrl + url, httpOptions).pipe(
      map((response: any) => response),
      catchError((response) => {
        this.errorHandlerForHttpRequest(response);
        return of(response);
      })
    );
  }

  errorHandlerForHttpRequest(error: Response | any) {
    if (error.error && error.status.code === 401) {
    } else if (error.status === HttpStatusCode.Forbidden) {
      if (error.message) {
      }
    } else if (
      error.status === HttpStatusCode.BadRequest ||
      error.status === HttpStatusCode.InternalServerError ||
      error.status === 0 ||
      error.status === HttpStatusCode.NotFound
    ) {
    }

    return throwError(error);
  }

  getHttpHeader() {
    let headerJson: any = null;
    if (this.getAuthToken() === '') {
      headerJson = {
        'Content-Type': 'application/json',
      };
    } else {
      headerJson = {
        'Content-Type': 'application/json',
        Authorization: this.getAuthToken(),
      };
    }

    const headersObj = new HttpHeaders(headerJson);
    const httpOptions = {
      headers: headersObj,
    };
    return httpOptions;
  }

  getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  getAuthToken() {
    let currentUser;
    if (this.getLocalStorage('LoggedInUser')) {
      currentUser = JSON.parse(this.getLocalStorage('LoggedInUser')!);
    }
    // console.log(currentUser, currentUser.data, currentUser.token);
    // currentUser && currentUser.data && currentUser.token
    if (currentUser && currentUser.data != '') {
      // if (currentUser && currentUser.data && currentUser.token != '') {
      // if (currentUser && currentUser.data && currentUser.token != '') {
      return `Bearer ${currentUser['token']}`;
    } else {
      return '';
    }
  }
}
