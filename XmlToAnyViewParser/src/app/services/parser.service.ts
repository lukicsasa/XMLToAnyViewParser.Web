import { Injectable } from '@angular/core';
import { SessionService } from "./session.service";
import { RequestService } from "./request.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ParserService {

  constructor(private requestService: RequestService, private sessionService: SessionService, private cookieService: CookieService) { }

  getLoginPage = () => {
    return this.requestService.get('parser', { client: 'web', isLogin: true });
  };

  getRegisterPage = () => {
    return this.requestService.get('parser', { client: 'web', isLogin: false });
  };

  getHomePage = () => {
    return this.requestService.get('parser', { client: 'web', view: 'home' });
  };
}
