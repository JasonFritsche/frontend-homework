import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignupData } from '../models/signup';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  public signup(signupData: ISignupData) {
    return this.httpClient
      .post<ISignupData>('http://localhost:8000/api/create', signupData)
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            console.log('user created');
          }
          return response;
        }),
        catchError((error) => {
          console.warn('unable to create user');
          return of('error');
        })
      );
  }
}
