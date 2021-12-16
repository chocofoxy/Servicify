import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.scss']
})
export class WorkerCardComponent implements OnInit {

  @Input('worker') worker

  post = { content: ''}

  constructor(private ticketService:TicketService ) {}

  ngOnInit() {
    console.log(this.worker)
  }

  sendTicket() {
    this.ticketService.sendTicket(this.worker.id ,this.post).then(() => {}).catch(e => console.log(e))
  }
}
