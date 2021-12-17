import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  logout(){    
    this.userService.logout()
    .then(() => this.router.navigate(['/']))
    .catch((e) => console.error(e))
  }

  settings(){    
    this.router.navigate(['/settings'])
  }

}
