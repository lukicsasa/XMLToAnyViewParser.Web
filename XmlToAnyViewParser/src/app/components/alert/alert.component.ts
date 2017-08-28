import {Component, OnInit, OnDestroy} from '@angular/core';
import {AlertService, IAlert} from "../../services/alert.service";

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
	alerts: Array<IAlert> = [];
	constructor(private alertService: AlertService) {}
	ngOnInit() {
		this.alertService.alert_emitter.subscribe((alert: IAlert) => {
			this.alerts.push(alert);
			setTimeout(() => {
				this.close(alert);
			}, (alert.duration || 3000));
		});
	}
	ngOnDestroy() {
		this.alertService.alert_emitter.unsubscribe();
	}
	close(alert: IAlert) {
		let tmpIndex = this.alerts.indexOf(alert);
		if(tmpIndex != -1) this.alerts.splice(tmpIndex, 1);
	}
}
