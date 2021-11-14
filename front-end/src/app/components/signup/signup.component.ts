import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  public signupForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    workEmail: [''],
    password: [''],
    phone: [''],
  });

  ngOnInit(): void {}
}
