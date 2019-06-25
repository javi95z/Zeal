import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.currentUser
        .then(res => resolve(!!res.is_admin))
        .catch(() => resolve(false));
    });
  }

}
