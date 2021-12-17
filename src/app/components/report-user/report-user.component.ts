import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from 'src/app/pages/client/profile/profile.component';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent  {

  report = { message: '' }

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  reportUser() {
    this.userService.report(this.data.id , this.report).then(() => {
      this.openSnackBar(" You reported this user successfully")
      this.dialogRef.close();
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }
}
