import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { FALSE_VALUE_LOCAL_STORAGE } from './../shared/const.value';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User;
  logOutNotifySubscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataInHeader();
  }

  onLogOut() {
    this.user = undefined!;
    localStorage.removeItem('isLoggedIn');
    this.userService.clearSessionStorage();
    this.logOutNotifySubscription.unsubscribe();
  }

  initDataInHeader(): void {
    if (localStorage.getItem('rememberMe') === FALSE_VALUE_LOCAL_STORAGE) {
      this.getUserInfo(sessionStorage.getItem('userName')!);
    } else {
      if (localStorage.getItem('isLoggedIn')) {
        this.getUserInfo(localStorage.getItem('userName')!);
      }
    }

    this.logOutNotifySubscription =
      this.userService.logOutNotification.subscribe({
        next: () => {
          this.onLogOut();
        },
      });
  }

  getUserInfo(userName: string) {
    this.userService.getUserByUserName(userName).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
