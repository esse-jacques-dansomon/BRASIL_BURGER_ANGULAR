import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticatorService} from "../services/authentificator.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(private authService : AuthenticatorService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      const token = localStorage.getItem('access')
      if (token) {
         request = request.clone({
            setHeaders: {
               Authorization: `Bearer ${token}`,
            }
         });
      }
      return next.handle(request);
   }
}

export const AuthInterceptorProvider = {
   provide: HTTP_INTERCEPTORS,
   useClass: AuthInterceptor,
   multi: true,
};
