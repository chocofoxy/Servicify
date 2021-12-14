import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Role } from './Role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(public userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.getRole() == Role.Admin
  }
  
  
}
