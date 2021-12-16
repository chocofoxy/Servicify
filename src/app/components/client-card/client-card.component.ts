import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/services/admin.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  user: User;

  @Input('worker') worker =  false ;

  constructor(private userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestDialogComponent,{ 
      width: '500px' , 
      data: {} ,
      //backdropClass: 'bdrop',
    });
    dialogRef.afterOpened().subscribe( ()=> {
      console.log('open')
    })
    dialogRef.afterClosed().subscribe(() => {
      console.log('close')
    });
  }
  
  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

}
