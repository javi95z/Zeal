import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, ApiResource, Project } from "@models";
import { parseRelationships } from "@zeal/utils";
import { ToastService } from "./toast.service";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient, private toast: ToastService) {}

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
  getProject(id: number): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<Project>>(`${env.urlApi}/projects/${id}`, null)
        .toPromise()
        .then(res => resolve(res))
        .catch(rej => reject(rej));
    });
  }

  /**
   * Update one project
   * @param p Project
   */
  updateProject(p: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.http
        .put<Project>(`${env.urlApi}/projects/${p.id}`, parseRelationships(p))
        .toPromise()
        .then(res => {
          this.toast.setMessage(`Project ${res.name} updated successfully.`);
          resolve(res);
        })
        .catch(rej => reject(rej));
    });
  }
}
