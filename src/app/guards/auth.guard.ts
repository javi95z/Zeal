import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    let isLogged: boolean;
    this.auth.isLoggedIn.subscribe(data => isLogged = data );

    if (!isLogged) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
