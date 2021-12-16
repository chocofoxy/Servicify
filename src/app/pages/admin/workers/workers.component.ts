import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  displayedColumns: string[] = [ "id" , "username" , "email" , "job", "desponibility" , "description"  ]
  workers = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService) {}


  ngOnInit() {
    this.workers.filterPredicate = (data: any , filter: string) => {
      return data.username.includes(filter);
    };

    this.adminService.workers().then( workers => {
      this.workers.data = workers.map( worker => { 
        return { 
          id: worker.id , 
          username: worker.client.nom, 
          email: worker.client.email , 
          job: worker.job , 
          desponibility: worker.desponibility,   
          description: worker.description
        } 
      })
    })
    .catch((e) => console.log(e))
  }

  ngAfterViewInit() {
    this.workers.paginator = this.paginator;
  }

  clear() {
    this.search = ''
  }

  filter() {
    this.workers.filter = this.search
  }

}
