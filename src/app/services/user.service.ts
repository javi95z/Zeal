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
  private urlApi = `${env.urlApi}/users`;

  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get all users
   */
  getUsers(): Promise<ApiCollection<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<User>>(`${this.urlApi}/index`, null)
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
        .post<ApiResource<User>>(`${this.urlApi}/${id}`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Create one user
   * @param u User
   */
  createUser(u: User): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<User>>(this.urlApi, parseRelationships(u))
        .toPromise()
        .then(res => {
          const user = new User(res.data);
          this.toast.setMessage(`User ${user.fullName} created successfully`);
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage("Failed to create user", "error");
          reject(rej);
        });
    });
  }

  /**
   * Update one user
   * @param u User
   */
  updateUser(u: Object, id: number): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<User>>(`${this.urlApi}/${id}`, u)
        .toPromise()
        .then(res => {
          const user = new User(res.data);
          this.toast.setMessage(`User ${user.fullName} updated successfully`);
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage("Failed to update user", "error");
          reject(rej);
        });
    });
  }

  /**
   * Delete one user
   * @param u User
   */
  deleteUser(u: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.urlApi}/${u.id}`)
        .toPromise()
        .then(res => {
          const user = new User(u);
          this.toast.setMessage(`User ${user.fullName} deleted successfully.`);
          resolve(res as boolean);
        })
        .catch(rej => {
          this.toast.setMessage("Failed to delete user", "error");
          reject(rej);
        });
    });
  }

  /**
   * Remove teams from user
   * @param id User id
   * @param teams Teams ids
   */
  removeTeam(id: number, teams: number[]): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<User>>(`${this.urlApi}/${id}/removeteam`, { teams })
        .toPromise()
        .then(res => {
          this.toast.setMessage(
            `User removed from the ${teams.length > 1 ? "teams" : "team"}.`
          );
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage(rej.error.error, "error");
          reject(rej);
        });
    });
  }

}
