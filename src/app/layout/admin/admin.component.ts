import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  links = [
    { title: 'Home' , path: "/admin/home", class: "" , icon: "dashboard"},
    { title: 'Clients' , path: "/admin/clients", class: "" , icon: "person"},
    { title: 'Workers' , path: "/admin/workers", class: "" , icon: "group"},
    { title: 'Reports' , path: "/admin/reports", class: "" , icon: "feedback"},
    { title: 'Feedbacks' , path: "/admin/feedbacks", class: "" , icon: "assignment"},
    { title: 'Categories' , path: "/admin/categories", class: "" , icon: "reorder"},
    { title: 'Requests' , path: "/admin/requests", class: "" , icon: "assignment"},
  ]

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.userService.logout()
    .then(() => this.router.navigate(['/']))
    .catch((e) => console.error(e))
  }

}
