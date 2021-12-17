import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from 'src/app/pages/client/profile/profile.component';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-ticket',
  templateUrl: './send-ticket.component.html',
  styleUrls: ['./send-ticket.component.scss']
})
export class SendTicketComponent  {

  ticket = { content: '' }

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    private ticketService: TicketService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendTicket() {
    this.ticketService.sendTicket(this.data.id , this.ticket).then(() => {
      this.openSnackBar(" Ticket sent successfully")
      this.dialogRef.close();
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }

}
