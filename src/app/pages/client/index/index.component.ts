import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/class/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { PostService } from 'src/app/services/post.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ClientIndexComponent implements OnInit {

  links = [
    { title: 'Home' , path: "/home", class: "" , icon: "dashboard"},
    { title: 'Profile' , path: "/profile", class: "" , icon: "person"},
    { title: 'Dashboard' , path: "/worker", class: "" , icon: "group"},
  ]
    requestform: FormGroup;
    user: User;
    request: any = {};
    categories = [];
    posts = [];
    recommended = [];
    search = []
    query = ''

    workers = []
  
    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private postService: PostService,
      private alertyfy:AlertyfyService, 
      private suggetionService: SuggestionService
    ) {}
  
    ngOnInit() {
      this.user = this.userService.getUser();
      this.postService.posts_list()
      .then((response:any) => {
        this.posts = response
      })
      .catch(this.errorLoading);
      this.suggetionService.recommendation()
      .then((response:any) => {
        this.recommended = response
        this.workers = response
      })
      .catch(this.errorLoading);
      this.suggetionService.searchByName('')
      .then((response:any) => {
        this.search = response
      })
      .catch(this.errorLoading);
      this.suggetionService.listCategories()
      .then((response:any) => {
        this.categories = response
      })
      .catch(this.errorLoading)
      this.requestform = this.fb.group({
        job: [""],
        description: [""],
        disponible: [""],
      });
    }
  
    requestRole() {
      this.userService
        .requestRole(this.request)
        .then()
        .catch((e) => console.error(e));
    }
  
    errorLoading(e) {
      console.log(e)
      //this.alertyfy.error("error loading data")
    }
  
    searchWorker() {
      this.suggetionService.searchByName(this.query)
      .then((response:any) => {
        this.search = response
        this.workers = response
      })
      .catch(this.errorLoading);
    }

    requestsend(){
      this.alertyfy.success("your request has been send")
    }

}
