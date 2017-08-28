import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { IUser } from "../interfaces/IUser";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { SessionService } from "./session.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private requestService: RequestService, private sessionService: SessionService, private cookieService: CookieService) { }

  login = (email: string, password: string) => {
    return this.requestService.post('login', {email: email, password: password})
      .flatMap((response : {user: IUser, token: string}) => {
        this.sessionService.initSession(response.token, response.user);
        return Observable.create(observer => {
            observer.next(response);
            observer.complete();
        });  
      });
  };
}
