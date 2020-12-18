import { Injector } from "@angular/core";
import { ApiService, DialogService } from "@services";
import { Field } from "@models";
import { reduceObject } from "@zeal/utils";

export class MasterClass<T> {
  fields: Field[];
  resourceName: string;
  protected api: ApiService<T>;
  protected dialog: DialogService;

  constructor(private injectorObj: Injector) {
    this.api = this.injectorObj.get(ApiService);
    this.dialog = this.injectorObj.get(DialogService);
  }

  /**
   * Show dialog and return new resource
   * Add aditional data if existent
   * Send API request for creation
   * @param params Aditional data
   */
  public async createDialog(params?: object): Promise<ApiResource<T>> {
    // Open dialog and save result
    let response: T;
    await this.openDialog()
      .toPromise<T>()
      .then((o) => {
        if (!o) return;
        if (params) Object.assign(o, reduceObject(params));
        response = o;
      });
    if (!response) return;
    // Call API and return result
    let result: ApiResource<T>;
    await this.api
      .createOne(this.resourceName, response)
      .then((o) => (result = o))
      .catch((err) => (result = err));
    return result;
  }

  /**
   * Show dialog and return updated resource
   * Send API request for modification
   * @param resource New resource data to update
   * @param id Id of resource to update
   */
  public async editDialog(resource: T, id: number): Promise<ApiResource<T>> {
    // Open dialog and save result
    let response: T;
    await this.openDialog(resource)
      .toPromise<T>()
      .then((o) => (response = o));
    if (!response) return;
    // Call API and return result
    let result: ApiResource<T>;
    await this.api
      .updateOne(this.resourceName, response, id)
      .then((o) => (result = o))
      .catch((err) => (result = err));
    return result;
  }

  /**
   * Confirmation dialog
   * to remove user
   * @param id Id of resource to delete
   * @param label Label to show on delete dialog
   */
  public async deleteDialog(id: number, label?: string) {
    // Open dialog and save result
    let response: boolean;
    await this.dialog
      .deleteDialog(label)
      .toPromise<boolean>()
      .then((o) => (response = o));
    if (!response) return;
    // Call API and return result
    let result: boolean;
    await this.api
      .deleteOne(this.resourceName, id)
      .then((o) => (result = o))
      .catch((err) => (result = err));
    return result;
  }

  /**
   * Open edit dialog for a resource
   * Populating the fields if needed
   */
  private openDialog(resource?: T) {
    return this.dialog.editDialog<T>({
      object: resource || null,
      fields: this.fields,
      nameResource: this.resourceName,
    });
  }
}
