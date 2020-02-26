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
   * Update one user
   * @param u User
   */
  updateUser(u: User): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<User>>(`${this.urlApi}/${u.id}`, parseRelationships(u))
        .toPromise()
        .then(res => {
          const user = new User(res.data);
          this.toast.setMessage(`User ${user.fullName} updated successfully.`);
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage(
            `Failed to update user ${u.fullName}.`,
            "error"
          );
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
          this.toast.setMessage(
            `Failed to delete user ${u.fullName}.`,
            "error"
          );
          reject(rej);
        });
    });
  }

  /**
   * Add user to teams
   * @param id Project id
   * @param teams Teams ids
   */
  addTeam(id: number, teams: number[]): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<User>>(`${this.urlApi}/${id}/addteam`, { teams })
        .toPromise()
        .then(res => {
          this.toast.setMessage(
            `User added to the ${teams.length > 1 ? "teams" : "team"}.`
          );
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage(rej.error.error, "error");
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

  editRole(id: number, role: number): Promise<ApiResource<User>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<User>>(`${this.urlApi}/${id}/changerole`, { role })
        .toPromise()
        .then(res => {
          this.toast.setMessage(`User role changed updated successfully`);
          resolve(res);
        })
        .catch(rej => {
          this.toast.setMessage(rej.error.error, "error");
          reject(rej);
        });
    });
  }
}
