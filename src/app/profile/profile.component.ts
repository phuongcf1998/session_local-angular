import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { passwordMatchingValidatior } from '../validator/form.validator';
import { UPDATE_PROFILE_SUCCESS_MESSAGE } from '../shared/const.value';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: User;
  profileForm!: FormGroup;
  errorUpdate!: HttpErrorResponse;
  updateSuccessMsg!: string;
  paramSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const { firstName, lastName, password } = this.profileForm.value;

    this.userService
      .updateUserInfo(this.user.username, firstName, lastName, password)
      .subscribe({
        next: (value) => {
          console.log(value);

          this.errorUpdate = undefined!;
          this.initForm();

          setTimeout(() => {
            this.profileForm.get('password')?.setValue(password);
            this.profileForm.get('rePassword')?.setValue(password);
          }, 100);

          this.updateSuccessMsg = UPDATE_PROFILE_SUCCESS_MESSAGE;
        },
        error: (err: HttpErrorResponse) => {
          this.errorUpdate = err;
          this.updateSuccessMsg = undefined!;
        },
        complete: () => {},
      });
  }

  onLogOut(): void {
    this.router.navigateByUrl('/');
    this.userService.logOutNotification.next('Log out');
  }

  initForm(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe((params) => {
      this.userService.getUserByUserName(params['username']).subscribe({
        next: (value) => {
          this.user = value;
          this.profileForm = this.fb.group(
            {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              password: '',
              rePassword: '',
            },
            { validators: passwordMatchingValidatior }
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    });
  }
}
