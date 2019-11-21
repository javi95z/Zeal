import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, ApiResource, Project } from "@models";
import { parseRelationships } from "@zeal/utils";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  /**
   * Get all projects
   */
  getProjects(): Promise<ApiCollection<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<Project>>(`${env.urlApi}/projects/index`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Get one project by id
   * @param id Id
   */
  getProject(id: number): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Project>(`${env.urlApi}/projects/${id}`, null)
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
  updateProject(p: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.http
        .put<Project>(`${env.urlApi}/projects/${p.id}`, parseRelationships(p))
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }
}
