import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesComponent } from 'src/app/pages/admin/categories/categories.component';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent implements OnInit  {

  categories = []
  request = {
    content: '' ,
    title: '' ,
    category: '',
    disponibility : ''
  }

  constructor(
    public dialogRef: MatDialogRef<ClientCardComponent>,
    private userService:UserService,
    private _snackBar: MatSnackBar,
    public suggestionService: SuggestionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.suggestionService.listCategories().then( (response:any) => {
      this.categories = response
    }).catch(e => console.log(e))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendRequest() {
    this.userService.requestRole(this.request).then(() => {
      this.openSnackBar('You request is sent to the Admininstration')
      this.dialogRef.close();
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }
}
