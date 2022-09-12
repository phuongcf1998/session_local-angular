import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { UserService } from '../service/user.service';
import { LoginComponent } from './login.component';
import {
  ERROR_STATUS,
  TRUE_VALUE_LOCAL_STORAGE,
  TRUE_VALUE_BOOLEAN,
  FALSE_VALUE_BOOLEAN,
  USER,
} from '../shared/const.value';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: { login: jest.Mock };

  beforeEach(async () => {
    userServiceMock = {
      login: jest.fn(() => of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should create new form when user don`t check remember me before', () => {
    
    sessionStorage.setItem('userName', USER.username); //Arrange

    component.ngOnInit(); //Act

    expect(component.loginForm.value.rememberMe).toEqual(FALSE_VALUE_BOOLEAN); //Assert
  });

  test('should load local storage data to form when user check remember me before', () => {

    sessionStorage.clear(); //Arrange
    localStorage.setItem('rememberMe', TRUE_VALUE_LOCAL_STORAGE); //Arrange
    localStorage.setItem('userName', USER.username); //Arrange

    component.ngOnInit(); //Act

    expect(component.loginForm.value.username).toEqual(USER.username); //Assert
    expect(component.loginForm.value.rememberMe.toString()).toEqual(
      TRUE_VALUE_LOCAL_STORAGE
    ); //Assert
  });

  test('should save data to local storage when user check remember me and login success', () => {

    component.loginForm.get('userName')?.setValue(USER.username); //Arrange
    component.loginForm.get('password')?.setValue(USER.password); //Arrange
    component.loginForm.get('rememberMe')?.setValue(TRUE_VALUE_BOOLEAN); //Arrange
    userServiceMock.login.mockImplementation(() => of(USER)); //Arrange

    component.onSubmit(); //Act

    expect(localStorage.getItem('userName')).toEqual(USER.username); //Assert
    expect(localStorage.getItem('rememberMe')).toEqual(
      TRUE_VALUE_LOCAL_STORAGE
    ); //Assert
  });

  test('should save data to session storage when user don`t check remember me and login success', () => { 

    component.loginForm.get('userName')?.setValue(USER.username); //Arrange
    component.loginForm.get('password')?.setValue(USER.password); //Arrange
    component.loginForm.get('rememberMe')?.setValue(FALSE_VALUE_BOOLEAN); //Arrange
    userServiceMock.login.mockImplementation(() => of(USER)); //Arrange

    component.onSubmit(); //Act

    expect(sessionStorage.getItem('userName')).toEqual(USER.username); //Assert
  });

  test('should show error when login fail', () => {
    
    userServiceMock.login.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            error: {
              message: 'The username or password is incorrect',
            },
          })
      )
    ); //Arrange

    component.onSubmit(); //Act

    expect(component.errorLogin.status).toEqual(ERROR_STATUS); //Assert
  });
});
