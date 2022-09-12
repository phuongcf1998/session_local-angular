import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../service/user.service';
import { passwordMatchingValidatior } from '../validator/form.validator';
import { SIGN_UP_SUCCESS_MESSAGE } from '../shared/const.value';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorSignUp!: HttpErrorResponse;
  signUpSuccessMsg!: string;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const { username, password, email } = this.signUpForm.value;
    this.userService.signUp(username, password, email).subscribe({
      next: (value) => {
        this.errorSignUp = undefined!;
        this.signUpSuccessMsg = SIGN_UP_SUCCESS_MESSAGE;
        console.log(value);
      },
      error: (err) => {
        this.errorSignUp = err;
      },
      complete: () => {
        console.log('Sign up success');
      },
    });
  }

  initForm(): void {
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.email],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%&*]{6,}$/)],
        ],
        rePassword: '',
      },
      { validators: passwordMatchingValidatior }
    );
  }
}
