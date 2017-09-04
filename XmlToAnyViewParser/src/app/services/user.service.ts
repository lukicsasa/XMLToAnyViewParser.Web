import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { IUser } from "../interfaces/IUser";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { SessionService } from "./session.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {


  constructor(private requestService: RequestService, private sessionService: SessionService, private cookieService: CookieService) { }

  login = (username: string, password: string) => {
    return this.requestService.post('login', { username: username, password: password, viewModelType: 'login' })
      .flatMap((response: { data: { user: IUser, token: string } }) => {
        this.sessionService.initSession(response.data.token, response.data.user);
        return Observable.create(observer => {
          observer.next(response);
          observer.complete();
        });
      });
  };

  register = (user: IUser) => {
    return this.requestService.post('register', { ...user, viewModelType: 'register' });
  }

  get(): Observable<IUser> {
    return this.requestService.get('user')
      .flatMap((response: IUser) => {
        return Observable.create(observer => {
          observer.next(response);
          observer.complete();
        });
      });
  }

  update(user: IUser): Observable<IUser> {
    return this.requestService.put('user', user)
      .flatMap((response: IUser) => {
        return Observable.create(observer => {
          observer.next(response);
          observer.complete();
        });
      });
  }
}
