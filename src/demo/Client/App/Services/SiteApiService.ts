import { Injectable, EventEmitter } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import * as Rx from 'rxjs/rx';
import 'rxjs/add/operator/map';
import { UserViewModel } from '../ViewModels/UserViewModel';

/**
 * This service just simulates a user store to keep the demo running without further dependencies.
 * 
 */
@Injectable()
export class SiteApiService {

  private users : Array<UserViewModel>;  

  constructor() {
    this.users = new Array<UserViewModel>(
      new UserViewModel(1, "Paul@parker.com", "030-123456", "Paul Parker"),
      new UserViewModel(1, "wilma@workshop.com", "055-123456", "Wilma Workshop"),
      new UserViewModel(1, "theodor@trainer.com", "088-123456", "Theodor Trainer"),
      new UserViewModel(1, "bill@boss.com", "001-55998877", "Bill Boss")
    );
  }

  /// User

  public getUser(id: number): Rx.Observable<UserViewModel> {
    var user = this.users.filter(u => u.id == id)[0];
    return Rx.Observable.create(o => o.next(user));
  }


  public getUsers(): Rx.Observable<Array<UserViewModel>> {
    return Rx.Observable.create(o => o.next(this.users));
  }

  public newUser(user: UserViewModel): Rx.Observable<boolean> {
    this.users.push(user);
    // always true 
    return Rx.Observable.create(o => true);
  }

  public editUser(id: number, user: UserViewModel): Rx.Observable<boolean> {
    var user = this.users.filter(u => u.id == id)[0];
    this.users.splice(this.users.indexOf(user), 1, user);
    // always true 
    return Rx.Observable.create(o => true);
  }

  /// Common Functions

  private handleError(error: Response) {
    console.error(error);
    return Rx.Observable.throw(error.json().error || 'Server error');
  }


}

