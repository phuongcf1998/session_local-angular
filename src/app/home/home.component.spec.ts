// import { UserService } from '../service/user.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';
// import { of, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

// jest.mock('../service/user.service');

// const USER = {
//   username: 'admin',
//   email: 'a@b.c',
//   firstName: 'John',
//   lastName: 'Doe',
// };

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   // let userService: UserService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [HomeComponent],
//       imports: [HttpClientTestingModule],
//       providers: [UserService],
//       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     // userService = fixture.debugElement.injector.get(UserService);
//   });

//   test('should create', () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   test('test Mock service', () => {
    

//     // userService.getUserByUserName = jest
//     //   .fn()
//     //   .mockImplementation(() => of(USER));

//     localStorage.setItem('userName', 'admin');

//     component.ngOnInit();

//     expect(component.user).toEqual(USER);
//   });

//   // test('test Mock service', () => {
//   //   userService.getUserByUserName = jest.fn().mockImplementation(() =>
//   //     throwError(
//   //       () =>
//   //         new HttpErrorResponse({
//   //           status: 404,
//   //         })
//   //     )
//   //   );
//   //   jest.spyOn(console, 'log');

//   //   localStorage.setItem('userName', 'admin');

//   //   component.ngOnInit();

//   //   expect(console.log).toHaveBeenCalled();
//   // });
// });
