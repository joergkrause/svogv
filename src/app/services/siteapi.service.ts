import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

import { UserViewModel, UserViewModelList } from '../viewmodels';
import { HttpErrorResponse } from '@angular/common/http';
import { SimpleUserViewModelList } from '../viewmodels/simpleuser.viewmodellist';

/**
 * This service just simulates a user store to keep the demo running without further dependencies.
 *
 */
@Injectable()
export class SiteApiService {
  // array for grids
  private users: UserViewModelList[];
  private simpleUsers: SimpleUserViewModelList[];

  constructor() {
    const now = new Date().getFullYear();
    // some static demo data
    const u1 = {
      id: 1,
      email: 'Paul@parker.com',
      phoneNumber: '030-123456',
      userName: 'Paul Parker',
      age: 22,
      birthday: new Date(now - 22, 5, 13),
      active: true
    };
    const u2 = {
      id: 2,
      email: 'wilma@workshop.com',
      phoneNumber: '055-123456',
      userName: 'Wilma Workshop',
      age: 35,
      birthday: new Date(now - 35, 11, 22)
    };
    const u3 = {
      id: 3,
      email: 'theodor@trainer.com',
      phoneNumber: '088-123456',
      userName: 'Theodor Trainer',
      age: 41,
      birthday: new Date(now - 41, 7, 3),
      active: true
    };
    const u4 = {
      id: 4,
      email: 'bill@boss.com',
      phoneNumber: '001-55998877',
      userName: 'Bill Boss',
      age: 58,
      birthday: new Date(now - 58, 2, 15),
      done: 50
    };
    const u5 = {
      id: 5,
      email: 'the@other.in',
      phoneNumber: '911-8899552233',
      userName: 'The Other',
      age: 56,
      birthday: new Date(now - 56, 6, 6),
      done: 70,
      active: true
    };
    const u6 = {
      id: 6,
      email: 'berny@duck.com',
      phoneNumber: '001-55997788',
      userName: 'Berny Duck',
      age: 39,
      birthday: new Date(now - 39, 2, 15),
      done: 100
    };
    const u7 = {
      id: 7,
      email: 'lisa@miller.com',
      phoneNumber: '001-77885566',
      userName: 'Lisa Miller',
      age: 53,
      birthday: new Date(now - 53, 2, 15),
      done: 85,
      active: true
    };
    const u8 = {
      id: 8,
      email: 'master@blaster.com',
      phoneNumber: '001-11225544',
      userName: 'Master Blaster',
      age: 33,
      birthday: new Date(now - 33, 2, 15)
    };

    this.users = new Array<UserViewModelList>();
    this.users.push(u1);
    this.users.push(u2);
    this.users.push(u3);
    this.users.push(u4);
    this.users.push(u5);
    this.users.push(u6);
    this.users.push(u7);
    this.users.push(u8);

    this.simpleUsers = new Array<SimpleUserViewModelList>();
    this.simpleUsers.push(u1);
    this.simpleUsers.push(u2);
    this.simpleUsers.push(u3);
    this.simpleUsers.push(u4);
    this.simpleUsers.push(u5);
    this.simpleUsers.push(u6);
    this.simpleUsers.push(u7);
    this.simpleUsers.push(u8);
  }

  public getUser(id: number): Observable<UserViewModel> {
    const user = this.users.filter((u) => u.id === id)[0] as UserViewModel;
    return new Observable((o) => o.next(user));
  }

  public getUsers(): Observable<UserViewModelList[]> {
    return new Observable((o) => o.next(this.users));
  }

  public getSimpleUsers(): Observable<SimpleUserViewModelList[]> {
    return new Observable((o) => o.next(this.users));
  }

  public newUser(user: UserViewModel): Observable<boolean> {
    // assure new id in simulated data stack
    const nextId =
      this.users
        .sort((u1, u2) => {
          return u1.id - u2.id;
        })
        .slice(-1)
        .pop().id + 1;
    // save
    const listUser = this.makeUser(user, nextId);
    this.users.push(listUser);
    // always true
    return of(true);
  }

  public editUser(id: number, editUser: UserViewModel): Observable<boolean> {
    const user = this.users.filter((u) => u.id === id)[0];
    if (user /* exists */) {
      const listUser = this.makeUser(editUser, id);
      this.users.splice(this.users.indexOf(user), 1, listUser);
      return of(true);
    }
    return of(false);
  }

  public deleteUser(id: number): Observable<boolean> {
    const user = this.users.filter((u) => u.id === id)[0];
    this.users.splice(this.users.indexOf(user), 1);
    // always true
    return of(true);
  }

  private makeUser(user: UserViewModel, nextId: number): UserViewModelList {
    const listUser: UserViewModelList = new UserViewModelList();
    listUser.userName = user.userName;
    listUser.age = user.age;
    listUser.done = user.done;
    listUser.email = user.email;
    listUser.id = nextId;
    listUser.phoneNumber = user.phoneNumber;
    return listUser;
  }

  /// Common Functions for real HTTP calls (currently not used in demo code)
  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server error');
  }
}
