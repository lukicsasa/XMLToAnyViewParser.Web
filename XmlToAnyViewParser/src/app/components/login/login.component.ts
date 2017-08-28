import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { SessionService } from "../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  passwordType = "password";
  email = '';
  password = '';

  constructor(private _userService: UserService, private sessionService: SessionService, private _router: Router) { }
  ngOnInit() {

  }

  submit = () => {
    this._userService.login(this.email, this.password).subscribe(r => {
        this._router.navigate([this.sessionService.getDeafultNavRoute()]);
    });
  }

}
