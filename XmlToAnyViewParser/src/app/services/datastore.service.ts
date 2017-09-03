import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
  private _error: string;
  private _prevRoute: string;

  constructor() { }

  get error(): string{
    return this._error;
  }
  set error(value: string) {
    this._error =  value;
  }
  
  get prevRoute(): string{
    return this._prevRoute;
  }
  set prevRoute(value: string) {
    this._prevRoute = value;
  }
}
