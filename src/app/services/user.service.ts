import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

  /**
   * Get all users
   */
  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(env.urlApi + '/users', this.auth.httpHeaders)
          .toPromise()
          .then(res => resolve(res as User[]));
    });
  }
}
