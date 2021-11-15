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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

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

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe((change) => {
      console.log(change);
      const errors = this.getFormErrors(this.signupForm);
      console.log(errors);
    });
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
    console.log(formGroup);
    return formGroup.get('password')?.value ===
      formGroup.get('verifyPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  private getFormErrors(form: AbstractControl | null) {
    if (form && form instanceof FormControl) {
      // Return FormControl errors or null
      return form?.errors ?? null;
    }
    if (form instanceof FormGroup) {
      const groupErrors = form.errors;
      // Form group can contain errors itself, in that case add'em
      const formErrors: any = groupErrors ? { groupErrors } : {};
      Object.keys(form.controls).forEach((key) => {
        // Recursive call of the FormGroup fields
        const error = this.getFormErrors(form.get(key)) ?? null;
        if (error !== null) {
          // Only add error if not null
          formErrors[key] = error;
        }
      });
      // Return FormGroup errors or null
      return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
    return null;
  }
}
