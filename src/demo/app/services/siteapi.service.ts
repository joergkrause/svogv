import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserViewModel } from '../viewmodels/index';

/**
 * This service just simulates a user store to keep the demo running without further dependencies.
 *
 */
@Injectable()
export class SiteApiService {

  private users: Array<UserViewModel>;

  constructor() {
    var now = new Date().getFullYear();
    // some static demo data
    let u1 = new UserViewModel();
    u1.id = 1;
    u1.email = 'Paul@parker.com';
    u1.phoneNumber = '030-123456';
    u1.userName = 'Paul Parker';
    u1.birthday = new Date(now - 22, 5, 13);
    u1.age = 22;
    let u2 = new UserViewModel();
    u2.id = 2;
    u2.email = 'wilma@workshop.com';
    u2.phoneNumber = '055-123456';
    u2.userName = 'Wilma Workshop';
    u2.age = 35;
    u2.birthday = new Date(now - 35, 11, 22);
    let u3 = new UserViewModel();
    u3.id = 3;
    u3.email = 'theodor@trainer.com';
    u3.phoneNumber = '088-123456';
    u3.userName = 'Theodor Trainer';
    u3.age = 41;
    u3.birthday = new Date(now - 41, 7, 3);
    let u4 = new UserViewModel();
    u4.id = 4;
    u4.email = 'bill@boss.com';
    u4.phoneNumber = '001-55998877';
    u4.userName = 'Bill Boss';
    u4.age = 58;
    u4.birthday = new Date(now - 58, 2, 15);
    let u5 = new UserViewModel();
    u5.id = 5;
    u5.email = 'the@other.in';
    u5.phoneNumber = '911-8899552233';
    u5.userName = 'The Other';
    u5.age = 56;
    u5.birthday = new Date(now - 56, 6, 6);
    let u6 = new UserViewModel();
    u6.id = 6;
    u6.email = 'berny@duck.com';
    u6.phoneNumber = '001-55997788';
    u6.userName = 'Berny Duck';
    u6.age = 39;
    u6.birthday = new Date(now - 39, 2, 15);
    let u7 = new UserViewModel();
    u7.id = 7;
    u7.email = 'lisa@miller.com';
    u7.phoneNumber = '001-77885566';
    u7.userName = 'Lisa Miller';
    u7.age = 53;
    u7.birthday = new Date(now - 53, 2, 15);
    let u8 = new UserViewModel();
    u8.id = 8;
    u8.email = 'master@blaster.com';
    u8.phoneNumber = '001-11225544';
    u8.userName = 'Master Blaster';
    u8.age = 33;
    u8.birthday = new Date(now - 33, 2, 15);

    this.users = new Array<UserViewModel>();
    this.users.push(u1);
    this.users.push(u2);
    this.users.push(u3);
    this.users.push(u4);
    this.users.push(u5);
    this.users.push(u6);
    this.users.push(u7);
    this.users.push(u8);
  }

  /// User

  public getUser(id: number): Observable<UserViewModel> {
    let user = this.users.filter(u => u.id == id)[0];
    return Observable.create(o => o.next(user));
  }


  public getUsers(): Observable<Array<UserViewModel>> {
    return Observable.create(o => o.next(this.users));
  }

  public newUser(user: UserViewModel): Observable<boolean> {
    // assure new id in simulated data stack
    let nextId = this.users.sort(function (u1, u2) { return u1.id - u2.id; }).slice(-1).pop().id + 1;
    // assign
    user.id = nextId;
    // save
    this.users.push(user);
    // always true 
    return Observable.create(o => true);
  }

  public editUser(id: number, userModel: UserViewModel): Observable<boolean> {
    let user = this.users.filter(u => u.id == id)[0];
    this.users.splice(this.users.indexOf(user), 1, userModel);
    // always true
    return Observable.create(o => true);
  }

  public deleteUser(id: number): Observable<boolean> {
    var user = this.users.filter(u => u.id == id)[0];
    this.users.splice(this.users.indexOf(user), 1);
    // always true 
    return Observable.create(o => true);
  }

  /// Common Functions

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}

