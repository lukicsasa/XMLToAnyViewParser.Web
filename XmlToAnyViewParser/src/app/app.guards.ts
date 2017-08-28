import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router';
import {SessionService} from './services/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private sessionService: SessionService, private router: Router) {

	}
	canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.handle();
	}

	canLoad(route: Route): boolean {
		return this.handle();
	}

	handle() {
		if(!this.sessionService.is_logged_in) {
			this.router.navigate([this.sessionService.getDeafultNavRoute()]);
			return false;
		}
		return true;
	}
}

export const appRoutingProviders: any[] = [AuthGuard];
