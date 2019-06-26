import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set token header
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.auth.token}` }
    });

    return next.handle(request)
      .pipe(tap(
        null,
        // (event: HttpEvent<any>) => { if (event instanceof HttpResponse) { } },
        (err: HttpErrorResponse) => {
          // Logout when unauthorized
          if (err.status === 401) {
            this.auth.doLogout();
            // TODO: Show dialog box
          }
        }
      ));
  }
}