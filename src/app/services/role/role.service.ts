import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Role } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  /**
   * Get all roles
   */
  getRoles(): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Role[]>(`${env.urlApi}/roles/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
