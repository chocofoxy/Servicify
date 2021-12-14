import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userService: UserService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.get('Anonymous') !== 'true') {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.userService.getToken()}`,
        },
      });
    } else {
       request = request.clone({ headers: request.headers.delete('Anonymous') });
    }
    return next.handle(request);
  }
}
