import { Injector } from "@angular/core";
import { ApiService, DialogService } from "@services";
import { Field, ApiResource } from "@models";
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
  public async createDialog(params?: object) {
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
   * Open edit dialog for a resource
   * Populating the fields if needed
   */
  private openDialog() {
    return this.dialog.editDialog<T>({
      object: null, // !
      fields: this.fields,
    });
  }
}
