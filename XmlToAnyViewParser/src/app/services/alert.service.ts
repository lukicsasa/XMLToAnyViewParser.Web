import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
	private _alert_emitter;
	constructor() {
		this._alert_emitter = new Subject();
	}
	get alert_emitter() {
		return this._alert_emitter;
	}
	showError(message: string) {
		let tmpMsg = {
			detail: message,
			type: 'danger'
		};
		this._alert_emitter.next(tmpMsg);
	}
	showInfo(message: string) {
		let tmpMsg = {
			detail: message,
			type: 'info'
		};
		this._alert_emitter.next(tmpMsg);
	}
	showWarn(message: string) {
		let tmpMsg = {
			detail: message,
			type: 'warning'
		};
		this._alert_emitter.next(tmpMsg);
	}
	showSuccess(message: string) {
		let tmpMsg = {
			detail: message,
			type: 'success'
		};
		this._alert_emitter.next(tmpMsg);
	}
	show(alert: IAlert) {
		this._alert_emitter.next(alert);
	}
}



export interface IAlert {
	message: string;
	duration?: number;
	type?: string; // success, info, warning, danger
}
