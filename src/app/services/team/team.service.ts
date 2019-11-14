import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Team } from "@models";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  /**
   * Get all teams
   */
  getTeams(): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Team[]>(`${env.urlApi}/teams/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
