import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  header = [ "id" , "username" , "prenom"  , "email", "Worker" , "Tel" , "Address" ]
  clients = []

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.clients().then( response => {
      this.clients = response
    })
    .catch((e) => console.log(e))
  }

}
