import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ParserService } from "../../services/parser.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 
  constructor(private _userService: UserService, private _parserService: ParserService) { }
  ngOnInit() {
    this._parserService.getHomePage().subscribe(r => {
      let html = r.view;

      let element = document.createElement("div")
      element.style.width = "100%";
      element.innerHTML = html;
      document.getElementById('homeView').appendChild(element);

      (<any>document.getElementById('submit')).addEventListener('click', this.hanldeUpdateClick);
    });
  }

  hanldeUpdateClick(e) {
    throw new Error("Method not implemented.");
  }

}
