import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, Role } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  /**
   * Get all roles
   */
  getRoles(): Promise<ApiCollection<Role>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<Role>>(`${env.urlApi}/roles/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
