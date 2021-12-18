import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ReportUserComponent } from 'src/app/components/report-user/report-user.component';
import { SendTicketComponent } from 'src/app/components/send-ticket/send-ticket.component';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { PostService } from 'src/app/services/post.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';
import { WorkerService } from 'src/app/services/worker.service';
import { ReportsComponent } from '../../admin/reports/reports.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  links = [
    { title: 'Home' , path: "/home", class: "" , icon: "dashboard"},
    { title: 'Profile' , path: "/profile", class: "" , icon: "person"},
    { title: 'Dashboard' , path: "/worker", class: "" , icon: "group"},
  ]
    requestform: FormGroup;
    user: User;
    request: any = {};
    categories = [];
    posts = [];
    recommended = [];
    search = []
    query = ''
    workers = []

    profile = null
  
    constructor(
      public dialog: MatDialog,
      private fb: FormBuilder,
      private workerService:WorkerService,
      private userService: UserService,
      public postService: PostService,
      private alertyfy:AlertyfyService, 
      private suggetionService: SuggestionService,
      private route: ActivatedRoute,
    ) {}
  
    ngOnInit() {
      this.user = this.userService.getUser();
      this.postService.posts_list()
      .then((response:any) => {
        this.posts = response
      })
      .catch(this.errorLoading);
      this.suggetionService.recommendation()
      .then((response:any) => {
        this.recommended = response
        this.workers = response
      })
      .catch(this.errorLoading);
      this.suggetionService.searchByName('')
      .then((response:any) => {
        this.search = response
      })
      .catch(this.errorLoading);
      this.suggetionService.listCategories()
      .then((response:any) => {
        this.categories = response
      })
      .catch(this.errorLoading)
      this.requestform = this.fb.group({
        job: [""],
        description: [""],
        disponible: [""],
      });
      this.userService.getProfile().then((response)=> {
        this.links[1].path = "/profile/" +  response.user.id
      }).catch( e => console.log(e))

      this.route.params.subscribe((params) => {
        const prodId = params['id']; 
        this.workerService.worker(prodId).then((response:any) => {
          this.profile = response
        }).catch(e => console.log(e))
        
      })
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
      .then((response:any) => {
        this.search = response
        this.workers = response
      })
      .catch(this.errorLoading);
    }

    requestsend(){
      this.alertyfy.success("your request has been send")
    }

    sendTicket() {
      const dialogRef = this.dialog.open(SendTicketComponent,{ 
        width: '500px' , 
        data: { id: this.profile.id} ,
        //backdropClass: 'bdrop',
      });
      dialogRef.afterOpened().subscribe( ()=> {
        console.log('open')
      })
      dialogRef.afterClosed().subscribe(() => {
        console.log('close')
      });
    }

    report() {
      const dialogRef = this.dialog.open(ReportUserComponent,{ 
        width: '500px' , 
        data: { id: this.profile.id} ,
        //backdropClass: 'bdrop',
      });
      dialogRef.afterOpened().subscribe( ()=> {
        console.log('open')
      })
      dialogRef.afterClosed().subscribe(() => {
        console.log('close')
      });
    }

}
