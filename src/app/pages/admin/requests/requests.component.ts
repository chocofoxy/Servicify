import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  displayedColumns: string[] =  [ "id" , "username" , "email" , "job", "desponibility" , "description" , "actions"  ];
  requests = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.request()
  }

  ngAfterViewInit() {
    this.requests.paginator = this.paginator;
  }

  approve(id) {
    this.adminService.approveRequest(id)
    .then(()=> {
      this.request()
      this.openSnackBar(" You successfully approved this request !")
    })
    .catch((e) => console.log(e))
  }

  reject(id) {
    this.adminService.rejectRequest(id)
    .then(() => {
      this.request()
      this.openSnackBar(" You successfully rejected this request !")
    })
    .catch((e) => console.log(e))
  }

  request() {
    this.requests.filterPredicate = (data: any , filter: string) => {
      return data.username.includes(filter);
    };
    this.adminService.requests().then( requests => {
      this.requests.data = requests.map( request => { 
        return { 
          id: request.id, 
          username: request.client.nom, 
          email: request.client.email , 
          job: request.job , 
          desponibility: request.desponibility,   
          description: request.description,
          actions: [
            { name: 'accept' , icon: "bi bi-check-square-fill mx-1 btn-primary" ,  tooltip: "approve this request", action: () => this.approve(request.id) } ,
            { name: 'reject' , icon: "bi bi-backspace-reverse-fill mx-1 btn-danger", tooltip: "reject this request" , action: () => this.reject(request.id) }
          ]
        } 
      })
    })
    .catch((e) => console.log(e))
  }

  clear() {
    this.search = ''
  }

  filter() {
    this.requests.filter = this.search
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 5 });
  }
}
