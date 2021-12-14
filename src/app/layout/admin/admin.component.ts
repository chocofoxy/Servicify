import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  link = [
    { name: 'Home' , href: "/home"},
    { name: 'Clients' , href: "/clients"},
    { name: 'Workers' , href: "/workers"},
    { name: 'Reports' , href: "/reports"},
    { name: 'Categories' , href: "/categories"},
    { name: 'Requests' , href: "/requests"},
  ]

  constructor() {}

  ngOnInit(): void {
  }

}
