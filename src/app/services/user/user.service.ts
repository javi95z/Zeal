import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "@models";
import { parseRelationships } from "@zeal/utils";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Get all users
   */
  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<User[]>(`${env.urlApi}/users/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Get one user by id
   * @param id Id
   */
  getUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post<User>(`${env.urlApi}/users/${id}`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Update one user by id
   * @param id Id
   * @param u User
   */
  updateUser(u: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .put<User>(`${env.urlApi}/users/${u.id}`, parseRelationships(u))
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Delete one user by id
   * @param id Id
   */
  deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${env.urlApi}/users/${id}`)
        .toPromise()
        .then(res => resolve(res as boolean))
        .catch(rej => reject(rej));
    });
  }
}
