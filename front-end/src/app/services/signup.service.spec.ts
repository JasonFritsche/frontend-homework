import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SignupService } from './signup.service';
import { ISignupData } from '../models/signup';

describe('SignupService', () => {
  let service: SignupService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    service = injector.get(SignupService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummySignupResponse = { response: 200 };

  const dummySignupForm: ISignupData = {
    firstName: 'Gene',
    lastName: 'Ween',
    password: 'Qwerty1!',
    verifyPassword: 'Qwerty1!',
    workEmail: 'test@awesomejob.com',
    verified: true,
  };

  it('getUserList() should return data', () => {
    service.signup(dummySignupForm).subscribe((res) => {
      expect(res).toEqual(dummySignupResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/create');
    expect(req.request.method).toBe('POST');
    req.flush(dummySignupResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
