import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models';
import { AuthService } from '../auth/auth.service';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  /**
   * Get all users
   */
  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.post<User[]>(`${env.urlApi}/users/index`, this.auth.headers)
          .toPromise()
          .then(res => resolve(res));
    });
  }

  /**
   * Get one user
   */
  getUser(id): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${env.urlApi}/users/${id}`, this.auth.headers)
          .toPromise()
          .then(res => resolve(res));
    });
  }
}
