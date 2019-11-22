import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, Team } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  /**
   * Get all teams
   */
  getTeams(): Promise<ApiCollection<Team>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<Team>>(`${env.urlApi}/teams/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
