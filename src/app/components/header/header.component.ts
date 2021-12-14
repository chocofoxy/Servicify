import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  logout(){
    console.log("hey from logout");
    
    this.userService.logout()
    .then(() => this.router.navigate(['/home']))
    .catch((e) => console.error(e))
  }

  isLogged() {
    return this.userService.isLogged()
  }

}
