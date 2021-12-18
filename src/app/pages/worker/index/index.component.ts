import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/class/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { PostService } from 'src/app/services/post.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class WorkerIndexComponent implements OnInit {

  links = [
    { title: 'Home', path: "/home", class: "", icon: "dashboard" },
    { title: 'Profile', path: "/profile", class: "", icon: "person" },
    { title: 'Dashboard', path: "/worker", class: "", icon: "group" },
  ]
  requestform: FormGroup;
  user: User;
  request: any = {};
  categories = [];
  posts = [];
  recommended = [];
  //search = []
  query = ''

  workers = []

  displayedColumns: string[] = ['id', 'from_client', 'message',  'actions'];
  tickets = new MatTableDataSource([])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search = ''

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService,
    private postService: PostService,
    private ticketService: TicketService,
    private alertyfy: AlertyfyService,
    private suggetionService: SuggestionService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.suggetionService.recommendedPosts()
      .then((response: any) => {
        this.posts = response
      })
      .catch(this.errorLoading);
    this.suggetionService.recommendation()
      .then((response: any) => {
        this.recommended = response
        this.workers = response
      })
      .catch(this.errorLoading);
    this.suggetionService.searchByName('')
      .then((response: any) => {
        this.search = response
      })
      .catch(this.errorLoading);
    this.suggetionService.listCategories()
      .then((response: any) => {
        this.categories = response
      })
      .catch(this.errorLoading)
    this.requestform = this.fb.group({
      job: [""],
      description: [""],
      disponible: [""],
    });
    this.userService.getProfile().then((response) => {
      this.links[1].path = "/profile/" + response.user.id
    }).catch(e => console.log(e))
    this.loadTickets()
    this.tickets.filterPredicate = (data: any, filter: string) => {
      return data.name.includes(filter);
    };
  }

  loadTickets() {
    this.ticketService.listTickets().then((tickets: any) => {
      this.tickets.data = tickets
    }).catch(this.errorLoading)
  }

  requestRole() {
    this.userService
      .requestRole(this.request)
      .then()
      .catch((e) => console.error(e));
  }

  errorLoading(e) {
    console.log(e)
    //this.alertyfy.error("error loading data")
  }

  searchWorker() {
    this.suggetionService.searchByName(this.query)
      .then((response: any) => {
        this.search = response
        this.workers = response
      })
      .catch(this.errorLoading);
  }

  requestsend() {
    this.alertyfy.success("your request has been send")
  }

  clear() {
    this.search = ''
  }

  filter() {
    this.tickets.filter = this.search
  }

  approve( id) {
    this.ticketService.acceptTicket(id).then(() => {
      this.openSnackBar(" This ticket has been approved !")
      this.loadTickets()
    }).catch(e => console.log(e))
  }

  ignore (id) {
    this.ticketService.declineTicket(id).then(() => {
      this.openSnackBar(" This ticket has been declined !")
      this.loadTickets()
    }).catch(e => console.log(e))
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 500 });
  }

}
