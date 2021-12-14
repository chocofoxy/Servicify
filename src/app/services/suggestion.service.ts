import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  recommendation() {
    return this.http.get(`/service/api/auth/sugUser/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  searchByName( name ) {
    return this.http.get(`/service/api/auth/recherchePerName/${name}/`)
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  searchByInfo( job , address ) {
    return this.http.get(`/service/api/auth/recherchePerCat/${job}/${address}/`)
    .toPromise()
    .then( (response) => {
      console.log(response)
      return response
    })
  }

  listCategories() {
    return this.http.get(`/service/api/auth/listeCategorie/`)
    .toPromise()
    .then( (response) => {
      console.log(response) 
      return response
    })
  }

  recommendedPosts() {
    return this.http.get(`/service/post/recommended/liste`)
    .toPromise()
    .then( (response) => {
      console.log(response) 
      return response
    })
  }
  
}
