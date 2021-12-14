import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../auth/Role';
import { User } from '../class/user';
import { AlertyfyService } from './alertyfy.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null = null

  constructor(private http: HttpClient, private config: ConfigService,private alertyfy:AlertyfyService) {}

  register(account) {
    return this.http
    .post(`/service/api/auth/register`, account, this.config.guestRequest)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      this.setUserAndToken(response)
      this.alertyfy.success("register successfully")
      return response
    })
  }

  login(credentials) {
    return this.http.post(`/service/api/auth/login`, credentials,  this.config.guestRequest)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      this.setUserAndToken(response)
      this.setProfile(response.user)
      this.alertyfy.success("login successful")
      return response
    })
  }

  setUserAndToken ( response ) {
    this.user =  new User( response.user.nom , response.user.email , response.user.is_employees, response.user.image || '' )
    localStorage.setItem('user', this.user.toJSON())
    localStorage.setItem('token',response.token)
    localStorage.setItem('role', response.user.groups ? Role.Admin : (response.user.is_employees ? Role.Worker : "client") )
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile) )
  }

  requestRole( form ) {
    return this.http.post(`/service/api/auth/send`, form)
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getProfile() {
    return this.http
    .get(`/service/api/auth/user`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  getUser() {
    const user = localStorage.getItem('user')
    if ( user ) {
      return JSON.parse(user)
    }
    return null
  }

  logout() { 
    const clear = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('profile')
    }
    return this.http.post(`/service/api/auth/logout`,{})
    .toPromise()
    .then( (response) => {
      console.log(response) 
      clear()
      return response
    })
  }

  isLogged() {
    return this.getToken() !== undefined && this.getToken() !== null
  }

  updateProfile( form ) {
    return this.http.put(`/service/api/auth/updateInfo/client`, form )
    .toPromise()
    .then( (response) => {
      console.log(response) 
      return response
    })
  }

  report(id) {
    return this.http.post(`/service/api/auth/report/add/${id}/`,{})
    .toPromise()
    .then( (response) => {
      console.log(response) 
      return response
    })
  }

  updateImage( form ) {
    return this.http.put(`/service/api/auth/updateImage/client`, form )
    .toPromise()
    .then( (response) => {
      console.log(response) 
      return response
    })
  }

  getRole() {
    return localStorage.getItem('role')
  }

}
