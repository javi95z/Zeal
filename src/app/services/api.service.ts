import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCollection, ApiResource } from "@models";
import { ToastService } from "./toast.service";
import { environment as env } from "@env/environment";
import { parseRelationships } from "@zeal/utils";

@Injectable({
  providedIn: "root",
})
export class ApiService<T> {
  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get all resources
   * @param uri URI Resource name
   */
  getAll(uri: string, obj?: Object): Promise<ApiCollection<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiCollection<any>>(`${env.urlApi}/${uri}/index`, obj)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }

  /**
   * Get one resource
   * @param uri URI Resource name
   * @param id Resource identifier
   */
  getOne(uri: string, id: number): Promise<ApiResource<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<any>>(`${env.urlApi}/${uri}/${id}`, null)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }

  /**
   * Create one resource
   * @param uri URI Resource name
   * @param obj Resource object
   */
  createOne(uri: string, obj: Object): Promise<ApiResource<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<any>>(`${env.urlApi}/${uri}`, obj)
        .toPromise()
        .then((res) => {
          this.toast.setMessage("Created successfully");
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage("Failed to create", "error");
          reject(rej);
        });
    });
  }

  /**
   * Update one resource
   * @param uri URI Resource name
   * @param obj Resource object
   * @param id Resource identifier
   */
  updateOne(uri: string, obj: Object, id: number): Promise<ApiResource<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .put<ApiResource<any>>(`${env.urlApi}/${uri}/${id}`, obj)
        .toPromise()
        .then((res) => {
          this.toast.setMessage("Updated successfully");
          resolve(res);
        })
        .catch((rej) => {
          this.toast.setMessage("Failed to update", "error");
          reject(rej);
        });
    });
  }

  /**
   * Delete one resource
   * @param uri URI Resource name
   * @param id Resource identifier
   */
  deleteOne(uri: string, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${env.urlApi}/${uri}/${id}`)
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Deleted successfully`);
          resolve(res as boolean);
        })
        .catch((rej) => {
          this.toast.setMessage(rej.error.error as string || "Failed to delete", "error");
          reject(rej);
        });
    });
  }
}
