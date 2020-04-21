import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "@models";
import { ToastService } from "./toast.service";
import { environment as env } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private urlApi = `${env.urlApi}/tasks`;

  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Delete one task
   * @param t Task
   */
  deleteTask(t: Task): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.urlApi}/${t.id}`)
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Task ${t.name} deleted successfully.`);
          resolve(res as boolean);
        })
        .catch((rej) => {
          this.toast.setMessage(`Failed to delete task ${t.name}.`, "error");
          reject(rej);
        });
    });
  }
}
