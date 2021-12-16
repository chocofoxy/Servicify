import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  displayedColumns: string[] = [ "id" , "reporter" , "reported" , "message", "date",  "actions"  ];
  reports = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.report()
  }

  ngAfterViewInit() {
    this.reports.paginator = this.paginator;
  }

  reject(id) {
    this.adminService.ignoreReport(id)
    .then(()=> {
      this.report()
      this.openSnackBar(" You successfully ignored this report !")
    })
    .catch((e) => console.log(e))
  }

  ban(id) {
    this.adminService.ban(id)
    .then(() => {
      this.report()
      this.openSnackBar(" You successfully banned this user !")
    })
    .catch((e) => console.log(e))
  }

  report() {
    this.reports.filterPredicate = (data: any , filter: string) => {
      return data.reporter.includes(filter) || data.reported.includes(filter) ;
    };

    this.adminService.reports().then( reports => {
      this.reports.data = reports.map( report => { 
        return { 
          id: report.id, 
          reporter : report.fromcl.nom, 
          reported : report.tocl.client.nom , 
          message : report.message , 
          date: report.date_repport ,   
          actions: [
            { name: 'ban' , icon: "bi bi-check-square-fill mx-1 btn-primary" , tooltip: "ban this user", action: () => this.ban(report.id) } ,
            { name: 'reject' , icon: "bi bi-backspace-reverse-fill mx-1 btn-danger", tooltip: "reject report" , action: () => this.reject(report.id) }
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
    this.reports.filter = this.search
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 5 });

  }
}
