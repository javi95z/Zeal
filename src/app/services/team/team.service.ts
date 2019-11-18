import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Team } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  /**
   * Get all teams
   */
  getTeams(): Promise<ApiResponse<Team>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResponse<Team>>(`${env.urlApi}/teams/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
