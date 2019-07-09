import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models';
import { environment as env } from '../../../environments/environment';

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
      this.http.post<User[]>(`${env.urlApi}/users/index`, null)
          .toPromise()
          .then(res => resolve(res))
          .catch(rej => reject(rej));
    });
  }

  /**
   * Get one user
   */
  getUser(id): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${env.urlApi}/users/${id}`, null)
          .toPromise()
          .then(res => resolve(res))
          .catch(rej => reject(rej));
    });
  }

  deleteUser(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${env.urlApi}/users/${id}`)
          .toPromise()
          .then(res => resolve(res))
          .catch(rej => reject(rej));
    });
  }

  removeUser(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<User>(`${env.urlApi}/users/${id}`, null)
          .toPromise()
          .then(res => resolve(res))
          .catch(rej => reject(rej));
    });
  }
}
