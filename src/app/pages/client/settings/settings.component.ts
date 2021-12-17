import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/class/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { PostService } from 'src/app/services/post.service';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  links = [
    { title: 'Home', path: "/home", class: "", icon: "dashboard" },
    { title: 'Profile', path: "/profile", class: "", icon: "person" },
    { title: 'Dashboard', path: "/worker", class: "", icon: "group" },
  ]
  requestform: FormGroup;
  user = {
    username:'',
    numero_tel: '',
    adress: '',
    email :'',
    nom:'',
    prenom:'',
    image: ''
  };
  
  request: any = {};
  categories = [];
  posts = [];
  recommended = [];
  search = []
  query = ''

  workers = []

  test: boolean = false;
  profile = {
    username:'',
    numero_tel: '',
    adress: '',
    email :'',
    nom:'',
    prenom:'',
    image: ''
  };
  image
  preview = null

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private postService: PostService,
    private alertyfy: AlertyfyService,
    private suggetionService: SuggestionService,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser()
    this.profile = this.user
    this.userService.getProfile().then((profile: any) => {
      this.profile = { ...this.profile, ...profile }
      this.user.image = this.profile.image
    }).catch((e) => console.log(e))
    this.postService.posts_list()
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

    this.userService.getProfile().then((response)=> {
      this.links[1].path = "/profile/" +  response.user.id
    }).catch( e => console.log(e))
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

  edit() {
    this.test = true;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 1500 });
  }

  save() {
    this.userService.updateProfile(this.profile).then(()=>{
      this.openSnackBar(" profile is updated  successfully")
    }).catch(e => console.error(e))
    this.updateImage()
    this.test = true
  }

  updateImage() {
    const form = new FormData()
    form.append('images', this.image)
    this.userService.updateImage(form).then().catch(e => console.error(e))
  }

  onChange(event) {
    this.image = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };

    reader.readAsDataURL(this.image);
  }

}
