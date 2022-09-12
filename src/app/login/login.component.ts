import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../service/user.service';
import {
  TRUE_VALUE_LOCAL_STORAGE,
  FALSE_VALUE_LOCAL_STORAGE,
  MESSAGE_INVALID_PAYLOAD,
} from './../shared/const.value';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorLogin!: HttpErrorResponse;
  loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.loginSubscription = this.userService
      .login(username, password)
      .subscribe({
        next: () => {
          this.saveDataToStorage(this.loginForm.value.rememberMe);
          this.router.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          if (!error.error.message.includes(MESSAGE_INVALID_PAYLOAD))
            this.errorLogin = error;
        },
        complete: () => console.info('Post complete'),
      });
  }

  initForm(): void {
    if (sessionStorage.getItem('userName')) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: false,
      });
    } else {
      this.loginForm = this.fb.group({
        username: [
          localStorage.getItem('rememberMe') === 'true'
            ? localStorage.getItem('userName')
            : '',
          Validators.required,
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe:
          localStorage.getItem('rememberMe') === 'true' ? true : false,
      });
    }
  }

  saveDataToStorage(isRememberMe: boolean): void {
    isRememberMe
      ? (localStorage.setItem('userName', this.loginForm.value.username),
        localStorage.setItem('rememberMe', TRUE_VALUE_LOCAL_STORAGE),
        localStorage.setItem('isLoggedIn', TRUE_VALUE_LOCAL_STORAGE))
      : (sessionStorage.setItem('userName', this.loginForm.value.username),
        localStorage.setItem('rememberMe', FALSE_VALUE_LOCAL_STORAGE),
        sessionStorage.setItem('isLoggedIn', TRUE_VALUE_LOCAL_STORAGE));
  }
}
