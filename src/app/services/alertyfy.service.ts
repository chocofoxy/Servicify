import { Injectable } from '@angular/core';
//import * as aslertyfy from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class AlertyfyService {

  constructor() {}
  
  success(message) {
    //aslertyfy.success(message);
  }
  
  error(message) {
    //aslertyfy.error(message)
  }

  warning(message) {
    //aslertyfy.warning(message)
  }
}
