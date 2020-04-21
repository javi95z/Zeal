import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, ApiResource, Project, Task } from "@models";
import { parseRelationships } from "@zeal/utils";
import { ToastService } from "./toast.service";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private urlApi = `${env.urlApi}/projects`;

  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get all projects
   */
  getProjects(): Promise<ApiCollection<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<Project>>(`${this.urlApi}/index`, null)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }

  /**
   * Get one project by id
   * @param id Id
   */
  getProject(id: number): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<Project>>(`${this.urlApi}/${id}`, null)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }

  /**
   * Update one project
   * @param p Project
   */
  updateProject(p: Project): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<Project>>(
          `${this.urlApi}/${p.id}`,
          parseRelationships(p)
        )
        .toPromise()
        .then((res) => {
          this.toast.setMessage(
            `Project ${res.data.name} updated successfully.`
          );
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage(`Failed to update project ${p.name}.`, "error");
          reject(rej);
        });
    });
  }

  /**
   * Delete one project
   * @param p Project
   */
  deleteProject(p: Project): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.urlApi}/${p.id}`)
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Project ${p.name} deleted successfully.`);
          resolve(res as boolean);
        })
        .catch((rej) => {
          this.toast.setMessage(`Failed to delete project ${p.name}.`, "error");
          reject(rej);
        });
    });
  }

  /**
   * Add members to project
   * @param id Project id
   * @param users Users ids
   */
  addMember(id: number, users: number[]): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<Project>>(`${this.urlApi}/${id}/addmember`, {
          users: users,
        })
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Member added to the project.`);
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage(rej.error.error, "error");
          reject(rej);
        });
    });
  }

  /**
   * Remove members from project
   * @param id Project id
   * @param users Users ids
   */
  removeMember(id: number, users: number[]): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<Project>>(`${this.urlApi}/${id}/removemember`, {
          users: users,
        })
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Member removed from the project.`);
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage(rej.error.error, "error");
          reject(rej);
        });
    });
  }

  /**
   * Add members to project
   * @param id Project id
   * @param task Task
   */
  addTask(id: number, task: Task): Promise<ApiResource<Project>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<Project>>(`${this.urlApi}/${id}/addtask`, {
          task: task,
        })
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Task added to the project.`);
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage(rej.error.error, "error");
          reject(rej);
        });
    });
  }
}
