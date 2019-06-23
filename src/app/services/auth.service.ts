import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: User;
  httpHeaders = { headers: new HttpHeaders };

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  /**
   * Login with credentials
   * @param loginData Object { user, password }
   */
  doLogin(loginData): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(env.urlApi + '/auth/login', loginData)
          .toPromise()
          .then(res => {
            this.currentUser = res;
            this.httpHeaders.headers = new HttpHeaders({
              'Authorization': `Bearer ${res.api_token}`
            });
            this.loggedIn.next(true);
            resolve();
          }, rej => reject(rej) );
    });
  }

  doLogout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
