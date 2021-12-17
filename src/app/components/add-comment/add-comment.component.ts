import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {

  form = { content: '' }

  constructor(
    public dialogRef: MatDialogRef<PostCardComponent>,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  comment() {
    this.postService.comment(this.data.id , this.form).then(() => {
      this.openSnackBar(" Comment added successfully")
      this.postService.posts_list()
      this.dialogRef.close();
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }

}
