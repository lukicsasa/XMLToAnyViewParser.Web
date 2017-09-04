import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ParserService } from "../../services/parser.service";
import { IUser } from "../../interfaces/IUser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user = {} as IUser;
  constructor(private _userService: UserService, private _parserService: ParserService) { }
  ngOnInit() {
    this._parserService.getHomePage().subscribe(r => {
      let html = r.view;

      let element = document.createElement("div")
      element.style.width = "100%";
      element.innerHTML = html;
      document.getElementById('homeView').appendChild(element);

      this._userService.get().subscribe(r => {
        this.user = r;
        (<HTMLInputElement>document.getElementById('username')).value = this.user.username;
        (<HTMLInputElement>document.getElementById('email')).value = this.user.email;
        (<HTMLInputElement>document.getElementById('first-name')).value = this.user.firstName;
        (<HTMLInputElement>document.getElementById('last-name')).value = this.user.lastName;
      });

      (<any>document.getElementById('submit')).addEventListener('click', this.hanldeUpdateClick);
    });
  }

  hanldeUpdateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.user.username = (<HTMLInputElement>document.getElementById('username')).value;
    this.user.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.user.firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    this.user.lastName = (<HTMLInputElement>document.getElementById('last-name')).value;

    this._userService.update(this.user).subscribe(r => {
      this.user = r;
      (<HTMLInputElement>document.getElementById('username')).value = this.user.username;
      (<HTMLInputElement>document.getElementById('email')).value = this.user.email;
      (<HTMLInputElement>document.getElementById('first-name')).value = this.user.firstName;
      (<HTMLInputElement>document.getElementById('last-name')).value = this.user.lastName;
    });
  }

}
