import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email'];
  clients = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.clients.filterPredicate = (data: any , filter: string) => {
      return data.nom.includes(filter);
    };

    this.adminService.clients().then(response => {
      this.clients.data = response
    })
      .catch((e) => console.log(e))
  }

  ngAfterViewInit() {
    this.clients.paginator = this.paginator;

  }

  clear() {
    this.search = ''
  }

  filter() {
    this.clients.filter = this.search
  }

}
