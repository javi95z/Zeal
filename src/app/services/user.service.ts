import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Get all users
   */
  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get(env.urlApi + '/users')
          .toPromise()
          .then(res => resolve(res as User[]));
    });
  }
}
