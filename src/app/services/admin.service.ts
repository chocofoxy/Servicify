import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private config: ConfigService , private userService: UserService) {}

  clients() {
    return this.http
    .get(`/service/api/auth/list_client/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  workers() {
    return this.http
    .get(`/service/api/auth/list_ouvrier/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  approveRequest(id) {
    return this.http
    .put(`/service/api/auth/accept_employees/${id}/`,{})
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  ban(id) {
    return this.http.put(`/service/api/auth/report/accepte/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  ignoreReport(id) {
    return this.http.put(`/service/api/auth/report/delete/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  addCategory(form) {
    return this.http.post(`/service/api/auth/addCategorie/`,form )
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  deleteCategory(id) {
    return this.http.delete(`/service/api/auth/deleteCategorie/${id}/` )
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  listFeedback() {
    return this.http.get(`/service/api/auth/contactUS/liste` )
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  rejectRequest(id) {
    return this.http.put(`/service/api/auth/refuse_role/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  requests() {
    return this.http.get(`/service/api/auth/listRequest/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  reports() {
    return this.http.get(`/service/api/auth/report/liste/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  login(form) {
    return this.http.post(`/service/api/auth/admin/login`, form , this.config.guestRequest )
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      this.userService.setUserAndToken(response)
      return response
    })
  }

}
