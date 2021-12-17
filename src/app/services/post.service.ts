import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts = []

  constructor(private http: HttpClient, private config: ConfigService) {}

  create_post( form ) {
    return this.http
    .post(`/service/post/add/`, form )
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  posts_list() {
    return this.http.get(`/service/post/liste/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      this.posts = response
      return response
    })
  }

  comment( id ,  form  ) {
    return this.http
    .post(`/service/post/commentaire/add/${id}/`, form )
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

  
  deletePost( id ) {
    return this.http
    .delete(`/service/post/delete/${id}/`)
    .toPromise()
    .then( (response:any) => {
      console.log(response)
      return response
    })
  }

}
