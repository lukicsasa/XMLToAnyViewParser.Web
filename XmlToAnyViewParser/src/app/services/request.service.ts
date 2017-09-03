import {Injectable} from "@angular/core";
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import {AlertService} from "./alert.service";
import {SessionService} from "./session.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import { DataStorageService } from "./datastore.service";

@Injectable()
export class RequestService {
	public _headers: Headers;
	constructor (private _http: Http, private alertService: AlertService, private sessionService: SessionService, private router: Router, private dataStorageService: DataStorageService) {
		this._headers = new Headers();
		this._headers.set('Content-Type', 'application/json');
	}
	get(uri: any, params?: Object, external?: boolean): Observable<any> {
		if(!external) this._headers.set('Authorization', this.sessionService.access_token);
		uri = typeof uri == 'object' ? uri.join('/') : uri;
		return this._http.get((external ? '' : environment.base_uri) + uri, {body: '', headers: (external ? undefined : this._headers), search: this.objToGet(params)})
			.map(this.extractData)
			.catch(this.handleError);
	}
	post(uri: any, params: Object = {}): Observable<any> {
		this._headers.set('Authorization', this.sessionService.access_token);
		uri = typeof uri == 'object' ? uri.join('/') : uri;
		return this._http.post(environment.base_uri + uri, JSON.stringify(params),{headers: this._headers})
			.map(this.extractData)
			.catch(this.handleError);
	}
	put(uri: any, params: Object = {}): Observable<any> {
		this._headers.set('Authorization', this.sessionService.access_token);
		uri = typeof uri == 'object' ? uri.join('/') : uri;
		return this._http.put(environment.base_uri + uri, JSON.stringify(params),{headers: this._headers})
			.map(this.extractData)
			.catch(this.handleError);
	}
	remove(uri: any, params?: Object): Observable<any> {
		this._headers.set('Authorization', this.sessionService.access_token);
		uri = typeof uri == 'object' ? uri.join('/') : uri;
		return this._http.delete(environment.base_uri + uri, {headers: this._headers, search: this.objToGet(params)})
			.map(this.extractData)
			.catch(this.handleError);
	}
	files(uri: any, reqType: string, files: Array<File>, params?: Object): Observable<any> {
		return Observable.create(observer => {
			let formData: FormData = new FormData();
			let xhr: XMLHttpRequest = new XMLHttpRequest();
			if(params) {
				for(let k in params) {
					let v = params[k];
					formData.append(k, v);
				}
			}
			for(let i = 0; i < files.length; i++) formData.append(files[i].name, files[i]);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						observer.next(JSON.parse(xhr.response));
						observer.complete();
					} else {
						this.handleError(JSON.parse(xhr.response));
						observer.complete();
					}
				}
			};
			uri = typeof uri == 'object' ? uri.join('/') : uri;
			xhr.open(reqType.toUpperCase(), environment.base_uri + uri, true);
			xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			xhr.setRequestHeader('Authorization', this.sessionService.access_token);
			xhr.send(formData);
		});
	}
	private extractData = (res: Response) => {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		if(body.success == false) {
			throw new Error(body.message);
		}
		return body || { };
	};
	private handleError = (error: any) => {
		let message = 'Error';
		this.dataStorageService.prevRoute = this.router.url;
		if(error.status === 0) {
			this.dataStorageService.error = "Can't connect to server.";
			this.router.navigateByUrl('/error');
		}
		else if(error.status === 401) {
			this.sessionService.logout();
			this.router.navigate([this.sessionService.getDeafultNavRoute()]);
		} else {
			message = error._body ? JSON.parse(error._body).message : error.message;
			if(message) {
				this.alertService.showError(message);
			}
		}
		return Observable.throw(message);
	};
	objToGet(o): URLSearchParams {
		let tmpParams = new URLSearchParams();
		for (let key in o) {
			tmpParams.set(key, o[key]);
		}
		return tmpParams;
	}
}
