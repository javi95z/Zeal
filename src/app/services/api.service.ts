import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "@env/environment";
import { ApiCollection, ApiResource } from "@models";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: "root",
})
export class ApiService<T> {
  constructor(private http: HttpClient, private toast: ToastService) {}

  /**
   * Get all resources
   * @param uri URI Resource name
   * @param obj Optional body for the request
   */
  public getAll(uri: string, obj?: object): Promise<ApiCollection<any>> {
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
  public getOne(uri: string, id: number): Promise<ApiResource<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<any>>(`${env.urlApi}/${uri}/${id}`, null)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }

  /**
   * Get custom resource
   * @param uri URI Resource name
   * @param id Resource identifier
   * @param endpoint Extra slug for the reequest
   */
  public getCustom(uri: string, id: number, endpoint: string): Promise<object> {
    return new Promise((resolve, reject) => {
      this.http
        .post<object>(`${env.urlApi}/${uri}/${id}/${endpoint}`, null)
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
  public createOne(
    uri: string,
    obj: Object,
    dontNotify?: boolean
  ): Promise<ApiResource<any>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResource<any>>(`${env.urlApi}/${uri}`, obj)
        .toPromise()
        .then((res) => {
          if (!dontNotify) this.toast.setMessage("Created successfully");
          resolve(res);
        })
        .catch((rej) => {
          if (!dontNotify) this.toast.setMessage("Failed to create", "error");
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
  public updateOne(
    uri: string,
    obj: Object,
    id: number
  ): Promise<ApiResource<any>> {
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
  public deleteOne(uri: string, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${env.urlApi}/${uri}/${id}`)
        .toPromise()
        .then((res) => {
          this.toast.setMessage(`Deleted successfully`);
          resolve(res as boolean);
        })
        .catch((rej) => {
          this.toast.setMessage(
            (rej.error.error as string) || "Failed to delete",
            "error"
          );
          reject(rej);
        });
    });
  }

  public uploadImage(file, uri: string) {
    if (!file.type.match(/image.*/)) {
      this.toast.setMessage("The file uploaded is not an image.", "error");
      return;
    }
    const body = new FormData();
    body.append("profile_image", file, file.name);
    return new Promise((resolve, reject) => {
      this.http
        .post(`${env.urlApi}/${uri}`, body)
        .toPromise()
        .then((res) => resolve(res))
        .catch((rej) => reject(rej));
    });
  }
}
