import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { AlertComponent } from "./components/alert/alert.component";
import { AlertService } from "./services/alert.service";
import { AuthGuard } from "./app.guards";
import { RequestService } from "./services/request.service";
import { SessionService } from "./services/session.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { RegisterComponent } from './components/register/register.component';
import { ParserService } from "./services/parser.service";
import { UserService } from "./services/user.service";
import { ErrorComponent } from "./components/error/error.component";
import { DataStorageService } from "./services/datastore.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AlertComponent,
    NotfoundComponent,
    RegisterComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [DataStorageService,AlertService,AuthGuard,SessionService,RequestService,CookieService, UserService, ParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
