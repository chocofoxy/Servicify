import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  sendTicket(id , form ) {
    return this.http
    .post(`/service/ticket/send/${id}/`, form )
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  listTickets() {
    return this.http.get(`/service/ticket/liste`)
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  acceptTicket(id) {
    return this.http.put(`/service/ticket/accept/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  declineTicket(id) {
    return this.http.put(`/service/ticket/refuser/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

}
