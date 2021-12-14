import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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
    .then( (response) => {
      console.log(response)
      return response
    })
  }

}
