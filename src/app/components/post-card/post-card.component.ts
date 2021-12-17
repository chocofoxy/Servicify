import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/class/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  user;
  @Input('post') post 
  comments = 0
  
  constructor(private postService: PostService, private userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  countComments( comments ) {
    console.log(comments)
    return comments.length
  }

  comment() {
    const dialogRef = this.dialog.open(AddCommentComponent,{ 
      width: '500px' , 
      data: {
        id: this.post.id
      } ,
    });
    dialogRef.afterOpened().subscribe( ()=> {
      console.log('open')
    })
    dialogRef.afterClosed().subscribe(() => {
      console.log('close')
    });
  }

  delete() {
    this.postService.deletePost(this.post.id).then(() => {
      this.openSnackBar('Your post has been deleted !')
      this.postService.posts_list()
    }).catch( e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 1500 });
  }

}
