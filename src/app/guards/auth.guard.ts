import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@services";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(["/auth"]);
      return false;
    }
    return true;
  }
}
