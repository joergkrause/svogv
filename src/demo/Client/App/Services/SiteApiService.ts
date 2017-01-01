import { Injectable, EventEmitter } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import * as Rx from 'rxjs/rx';
import 'rxjs/add/operator/map';
import { StudyViewModel } from '../ViewModels/StudyViewModel';
import { UserViewModel } from '../ViewModels/UserViewModel';

@Injectable()
export class SiteApiService {

  private baseUrl: string = '/api/';
  private seviceUrls = {
    studyService: this.baseUrl + 'study/',
    userService: this.baseUrl + 'user/',
  };

  constructor(public http: Http) {
  }

  /// Studies

  public getStudy(id: number): Rx.Observable<StudyViewModel> {
    return this.http
      .get(this.seviceUrls.studyService + id)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public getStudies(): Rx.Observable<Array<StudyViewModel>> {
    return this.http
      .get(this.seviceUrls.studyService)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public newStudy(study: StudyViewModel): Rx.Observable<boolean> {
    return this.http
      .post(this.seviceUrls.studyService, study)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public editStudy(id: number, study: StudyViewModel): Rx.Observable<boolean> {
    return this.http
      .put(this.seviceUrls.studyService + id, study)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /// User

  public getUser(id: number): Rx.Observable<UserViewModel> {
    return this.http
      .get(this.seviceUrls.userService + id)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  public getUsers(): Rx.Observable<Array<UserViewModel>> {
    return this.http
      .get(this.seviceUrls.userService)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public newUser(user: UserViewModel): Rx.Observable<boolean> {
    return this.http
      .post(this.seviceUrls.userService, user)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public editUser(id: number, user: UserViewModel): Rx.Observable<boolean> {
    return this.http
      .put(this.seviceUrls.userService + id, user)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /// Common Functions

  private handleError(error: Response) {
    console.error(error);
    return Rx.Observable.throw(error.json().error || 'Server error');
  }


}

