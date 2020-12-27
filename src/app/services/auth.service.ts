import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@models";
import { environment as env } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userData: User;

  get token(): string {
    return sessionStorage.getItem("token") || "";
  }
  set token(val: string) {
    sessionStorage.setItem("token", val);
  }
  get locale(): string {
    return localStorage.getItem("locale") || "en";
  }
  set locale(val: string) {
    localStorage.setItem("locale", val);
  }
  get isLoggedIn(): boolean {
    return !!this.token;
  }
  get currentUser(): Promise<User> {
    return new Promise((resolve) => {
      if (!this._userData) {
        this.getUser()
          .then((res) => this.setCurrentUser(res))
          .finally(() => resolve(this._userData));
      } else {
        resolve(this._userData);
      }
    });
  }
  setCurrentUser(data: User) {
    this._userData = data;
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
        .then(
          (res) => resolve(res),
          (rej) => reject(rej)
        );
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
        .then((res) => resolve(res));
    });
  }

  /**
   * Refresh token
   */
  // TODO: To promise
  refreshToken(): Observable<any> {
    return this.http.post(`${env.urlApi}/auth/refresh`, null);
  }
}
