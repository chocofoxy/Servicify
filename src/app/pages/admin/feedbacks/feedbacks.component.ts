import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'email' , 'message'];
  feedbacks = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.feedbacks.filterPredicate = (data: any , filter: string) => {
      return data.email.includes(filter);
    };

    this.adminService.listFeedback().then((response:any) => {
      this.feedbacks = response
    }).catch(e => console.log(e))

  }

  ngAfterViewInit() {
    this.feedbacks.paginator = this.paginator;

  }

  clear() {
    this.search = ''
  }

  filter() {
    this.feedbacks.filter = this.search
  }

}
