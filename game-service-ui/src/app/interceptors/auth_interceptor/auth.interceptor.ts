import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../core/services/auth-service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token= this.authService.userValue?.token;
    if (!token) {
      return next.handle(request);
    }
    const withHeader = request.clone({
      setHeaders: { "Authorization": `Bearer ${token}` }
    });
    return next.handle(withHeader);
  }
}
