import { Injectable } from "@angular/core";
import 'rxjs/add/operator/mergeMap';
import 'lockr';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Subject } from "rxjs/Subject";
import { IUser } from "../interfaces/IUser";
declare let Lockr: any;
@Injectable()
export class SessionService {
    private _user: IUser;
    private _accessToken: string;
    private _isLoggedIn: boolean = false;
    sessionChangedStream = new Subject();
    constructor(private cookieService: CookieService) {
        this.initSession(Lockr.get('xtavp_token'), Lockr.get('currentUser'));
    }

    get user(): IUser {
        return this._user;
    }

    set user(value: IUser) {
        this._user = value;
        Lockr.set('currentUser', this._user);
        this.sessionChangedStream.next(this._user);
    }

    setUserAttrs(values: Object) {
        for (let k in values) {
            this._user[k] = values[k];
            Lockr.set('currentUser', this._user);
            this.sessionChangedStream.next(this._user);
        }
    }

    get access_token(): string {
        return this._accessToken;
    }

    get is_logged_in(): boolean {
        return this._isLoggedIn;
    }

    getDeafultNavRoute(): string | boolean {
        if (this.is_logged_in) {
            return '/home';
        }
        return '/login';
    }

    logout() {
        this._isLoggedIn = false;
        this._accessToken = undefined;
        this._user = undefined;
        Lockr.rm('xtavp_token');
        Lockr.rm('currentUser');
    }

    initSession(_accessToken, _user) {
        if (_accessToken && _user) {
            this._accessToken = _accessToken;
            this._user = _user;
            Lockr.set('xtavp_token', _accessToken);
            Lockr.set('currentUser', _user);
            this._isLoggedIn = true;
        }
    }
}
