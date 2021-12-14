import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  guestRequest = { headers: { 'Anonymous': 'true' } }

  constructor() { }
}
