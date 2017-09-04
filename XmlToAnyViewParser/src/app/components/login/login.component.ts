import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "../../services/session.service";
import { UserService } from "../../services/user.service";
import { ParserService } from "../../services/parser.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private _userService: UserService, private sessionService: SessionService, private _router: Router, private _parserService: ParserService) { }
  ngOnInit() {
    this._parserService.getLoginPage().subscribe(r => {
      let html = r.view;

      let element = document.createElement("div")
      element.style.width = "100%";
      element.innerHTML = html;
      document.getElementById('loginForm').appendChild(element);

    (<any>document.getElementById('submit')).addEventListener('click', this.handleSubmit);
    (<any>document.getElementById('register')).addEventListener('click', this.handleRegister);
    
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;

    this._userService.login(username, password).subscribe(r => {
      this._router.navigate([this.sessionService.getDeafultNavRoute()]);   
     });
  }

  handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this._router.navigateByUrl('/register');
  }
}
