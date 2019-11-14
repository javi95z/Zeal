import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material";
import { User } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: User;

  get token(): string {
    return sessionStorage.getItem("token");
  }
  get isLoggedIn(): boolean {
    return !!this.token;
  }
  get currentUser(): Promise<User> {
    return new Promise(resolve => {
      if (!this.userData) {
        this.getUser().then(res => resolve((this.userData = res)));
      } else {
        resolve(this.userData);
      }
    });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Login with credentials
   * @param loginData Object { user, password }
   */
  doLogin(loginData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(env.urlApi + "/auth/login", loginData)
        .toPromise()
        .then(res => resolve(res), rej => reject(rej));
    });
  }

  /**
   * Log out of the application
   */
  doLogout() {
    this.http.post(`${env.urlApi}/auth/logout`, null);
    this.dialog.closeAll();
    this.router.navigate(["/login"]);
  }

  /**
   * Get logged user data
   */
  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post<User>(`${env.urlApi}/auth/me`, null)
        .toPromise()
        .then(res => resolve(res));
    });
  }
}
