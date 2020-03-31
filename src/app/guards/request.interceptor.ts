import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService, ToastService } from "@services";
import { Observable, throwError, defer, from } from "rxjs";
import { tap, catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private toast: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set token header
    const handler = defer(() => {
      const authReq = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${this.auth.token}`
        )
      });
      // Execute
      return next.handle(authReq);
    });

    return handler.pipe(
      catchError((error: HttpErrorResponse, retryRequest) => {
        if (error.status === 401) {
          // Not refresh token on invalid login
          const url = error.url.split("/");
          if (url[url.length - 1] === "login") {
            this.toast.setMessage("Unauthorized", "error");
            return throwError("login failed");
          }
          // Refresh token on Unauthorized 401 response
          return from(
            this.auth.refreshToken().pipe(
              tap(res => (this.auth.token = res.access_token)),
              catchError(() => {
                this.toast.setMessage("Session expired. Logging back in...");
                this.auth.doLogout();
                return throwError("refresh_token failed");
              }),
              mergeMap(() => retryRequest)
            )
          );
        } else if (error.status === 400) {
          return throwError(error);
        } else if (error.status === 500) {
          this.toast.setMessage("Internal server error", "error");
          return throwError(error);
        } else if (!error.status) {
          this.toast.setMessage(error.statusText, "error");
          this.auth.doLogout();
        } else {
          return throwError(error);
        }
      })
    );
  }
}
