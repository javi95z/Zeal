import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: User;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  /**
   * Login with credentials
   * @param email Email address
   * @param password Password
   */
  doLogin(user): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post(env.urlApi + '/auth/login', user)
          .toPromise()
          .then(res => {
            this.currentUser = res as User;
            this.loggedIn.next(true);
            resolve();
          }, rej => reject(rej) );
    });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
