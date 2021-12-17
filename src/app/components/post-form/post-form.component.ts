import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { PostService } from 'src/app/services/post.service';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postform: FormGroup;
  post = { title: '' , content: '' , category: ''}
  categories = []

  constructor(private fb: FormBuilder,private suggestionService:SuggestionService , private postService:PostService, private alertyfy:AlertyfyService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.postform = this.fb.group({
      title: [''],
      content: ['']
    })
    this.suggestionService.listCategories().then( (response:any) => {
      this.categories = response
    }).catch(e => console.log(e))
  }

  postClient() {
    this.postService.create_post(this.post) 
    .then(() => { 
      this.openSnackBar("Your post have been sent") 
      this.postService.posts_list()
      this.post = { title: '' , content: '' , category: ''}
    })     
    .catch((e) => {
      this.alertyfy.error("check your credentials");
      console.error(e)
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 1500 });
  }


}
