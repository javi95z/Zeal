import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@models";
import { environment as env } from "@env/environment";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new ReplaySubject<User>(1);
  user$: Observable<User> = this.userSubject.asObservable();

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Login with credentials
   * @param loginData Object { user, password }
   */
  doLogin(loginData: object): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post(env.urlApi + "/auth/login", loginData)
        .toPromise()
        .then(
          (res: any) => {
            this.token = res.access_token;
            this.user$.subscribe((user) => {
              if (user) {
                this.locale = user.locale;
                this.router.navigate(["/content"]);
              }
            });
            resolve(true);
          },
          (rej) => reject(rej)
        );
    });
  }
  /**
   * Sign up new user
   * @param loginData Object with sign up user
   */
  doSignUp(signupData: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(env.urlApi + "/users", signupData)
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
    this.router.navigate(["/auth"]);
  }

  /**
   * Get logged user data
   */
  getUser() {
    this.http
      .post<User>(`${env.urlApi}/auth/me`, null)
      .toPromise()
      .then((res) => this.userSubject.next(res));
  }

  /**
   * Refresh token
   */
  // TODO: To promise
  refreshToken(): Observable<any> {
    return this.http.post(`${env.urlApi}/auth/refresh`, null);
  }
}
