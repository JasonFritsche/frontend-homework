import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let mockSignupService;
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const toastrService = {
    success: (message?: string, title?: string) => {},
    error: (message?: string, title?: string) => {},
  };

  beforeEach(async () => {
    mockSignupService = jasmine.createSpyObj(['onFormSubmit']);
    mockSignupService.onFormSubmit.and.returnValue({ response: 200 });
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignupComponent],
      providers: [
        { provide: SignupService, useValue: mockSignupService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form controls initial values should exist', () => {
    const signupForm = component.signupForm;
    const signupFormValues = {
      firstName: '',
      lastName: '',
      workEmail: '',
      password: '',
      verifyPassword: '',
      phone: '',
      verified: false,
    };
    expect(signupForm.value).toEqual(signupFormValues);
  });

  it('work email should be null on initialize form', () => {
    const emailInput: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('#signupForm')
      .querySelectorAll('input')[4];
    const formEmailInput = component.signupForm.get('workEmail');
    expect(emailInput.value).toEqual(formEmailInput?.value);
    expect(formEmailInput?.errors).not.toBeNull();
  });

  it('work email should have error if wrong domain', async () => {
    const emailInput: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('#signupForm')
      .querySelectorAll('input')[4];
    emailInput.value = 'wrongDomain@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formEmailInput = component.signupForm.get('workEmail');
      expect(formEmailInput?.errors).toEqual({ required: true });
    });
  });
});
