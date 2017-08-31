import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { ParserService } from "../../services/parser.service";
import { IUser } from "../../interfaces/IUser";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, ParserService]
})
export class RegisterComponent implements OnInit {

  constructor(private _userService: UserService, private _alertService: AlertService, private _router: Router, private _parserService: ParserService) { }
  ngOnInit() {
    this._parserService.getRegisterPage().subscribe(r => {
      let html = r.view;

      let element = document.createElement("div")
      element.style.width = "100%";
      element.innerHTML = html;
      document.getElementById('registerForm').appendChild(element);

      (<any>document.getElementById('submit')).addEventListener('click', this.handleSubmit);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let user: IUser = {
      username: (<any>document.getElementById('username')).value,
      password: (<any>document.getElementById('password')).value,
      firstName: (<any>document.getElementById('first-name')).value,
      lastName: (<any>document.getElementById('last-name')).value,
      email: (<any>document.getElementById('email')).value
    }

    this._userService.register(user).subscribe(r => {
      this._alertService.showSuccess("Registred successfully.");
      this._router.navigateByUrl('/login');
    });
  }
}
