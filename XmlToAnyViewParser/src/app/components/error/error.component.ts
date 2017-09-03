import { Component, OnInit } from '@angular/core';
import { DataStorageService } from "../../services/datastore.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  error: string;
  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
    this.error = this.dataStorageService.error;
  }

  reload() {
    this.router.navigateByUrl(this.dataStorageService.prevRoute); 
  }
}
