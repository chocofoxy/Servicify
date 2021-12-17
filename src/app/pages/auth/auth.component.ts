import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginform: FormGroup;
  user: any = {};
  signupform : FormGroup;
  swipe: Boolean = false ;
  swipeClass: String = "container" ;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, 
    private alertyfy: AlertyfyService,private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.loginform = this.fb.group({
      username: [''],
      password: ['']
    })
    this.signupform = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dob: [''],
    })


  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 700 });
  }



  signup() {
    this.userService.register(this.signupform.value)
      .then(() => {this.swipeSide() 
      this.openSnackBar(" Signup is  successfully") })
      .catch((e) => console.error(e))
  }

  login() {
    this.userService.login(this.user)
      .then(() => {
        this.openSnackBar(" Login is  successfully") 
        this.router.navigate(['/home'])
      })
      .catch((e) => {
        this.alertyfy.error("check your credentials");
        console.error(e)
      })
  }

  swipeSide() {
    this.swipeClass = this.swipe ? "container" : "container right-panel-active"
    this.swipe = !this.swipe
  }
}
