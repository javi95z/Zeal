import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, ApiResource, User } from "@models";
import { parseRelationships } from "@zeal/utils";
import { ToastService } from "./toast.service";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get all users
   */
  getUsers(): Promise<ApiCollection<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<User>>(`${env.urlApi}/users/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Get one user by id
   * @param id Id
   */
  getUser(id: number): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<User>>(`${env.urlApi}/users/${id}`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Update one user
   * @param u User
   */
  updateUser(u: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .put<User>(`${env.urlApi}/users/${u.id}`, parseRelationships(u))
        .toPromise()
        .then(res => {
          const user = new User(res);
          this.toast.setMessage(`User ${user.fullName} updated successfully.`);
          resolve(user);
        })
        .catch(rej => reject(rej));
    });
  }

  /**
   * Delete one user
   * @param u User
   */
  deleteUser(u: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${env.urlApi}/users/${u.id}`)
        .toPromise()
        .then(res => {
          const user = new User(u);
          this.toast.setMessage(`User ${user.fullName} deleted successfully.`);
          resolve(res as boolean);
        })
        .catch(rej => reject(rej));
    });
  }
}