import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {

  @Input('worker') worker

  post = { content: ''}

  constructor(private ticketService:TicketService,private _snackBar:MatSnackBar ) {}

  ngOnInit() {
    console.log(this.worker)
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 1500 });
  }
  sendTicket() {
    this.ticketService.sendTicket(this.worker.id ,this.post).then(() => {this.openSnackBar(" ticket has been send  successfully") }).catch(e => console.log(e))
  }
}
