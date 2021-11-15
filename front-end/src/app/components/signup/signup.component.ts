import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  public signupForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      workEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@awesomejob+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, this.passwordValidator()]],
      verifyPassword: ['', Validators.required],
      phone: ['', RxwebValidators.mask({ mask: '(999) 999-9999' })],
    },
    { validators: this.passwordMatchValidator }
  );

  ngOnInit(): void {}

  public onFormSubmit() {
    console.log(this.signupForm.value);
    this.signupService
      .signup(this.signupForm.value)
      .subscribe((res) => console.log(res));
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCaseLetter = /[A-Z]+/.test(value);
      const hasLowerCaseLetter = /[a-z]+/.test(value);
      const hasNumericValue = /[0-9]+/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*]+/.test(value);

      const passwordValid =
        hasUpperCaseLetter &&
        hasLowerCaseLetter &&
        hasNumericValue &&
        hasSpecialCharacter;
      return !passwordValid
        ? {
            passwordStrength: {
              hasUpperCaseLetterError: !hasUpperCaseLetter,
              hasLowerCaseLetterError: !hasLowerCaseLetter,
              hasNumericValueError: !hasNumericValue,
              hasSpecialCharacterError: !hasSpecialCharacter,
              hasPasswordLengthError: value.length < 8,
            },
          }
        : null;
    };
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value ===
      formGroup.get('verifyPassword')?.value
      ? null
      : { passwordMismatch: true };
  }
}
