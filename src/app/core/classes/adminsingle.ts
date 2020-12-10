import { Injector } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService, DialogService } from "@services";
import { Tabs, Field, PanelAction } from "@models";
import { PANEL_ACTIONS } from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

export class AdminSingleClass<T> {
  public resourceName: string;
  private _resource: T;
  api: ApiService<T>;
  route: ActivatedRoute;
  dialog: DialogService;
  location: Location;
  router: Router;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];
  tabs = new Tabs();

  get resource(): T {
    return this._resource;
  }
  set resource(value: T) {
    this._resource = value as T;
  }

  constructor(private injectorObj: Injector) {
    this.api = this.injectorObj.get(ApiService);
    this.route = this.injectorObj.get(ActivatedRoute);
    this.router = this.injectorObj.get(Router);
    this.dialog = this.injectorObj.get(DialogService);
    this.location = this.injectorObj.get(Location);
  }

  // Get one resource from route parameters
  public getResource() {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.api
          .getOne(this.resourceName, data.id)
          .then((res) => (this.resource = res.data as T))
          .catch(() => (this.error = true))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  // Build options menu in the panel
  public buildMenu(actions: string[]) {
    this.menu = PANEL_ACTIONS.filter((o) => actions.includes(o.action));
  }

  /**
   * Edit a resource
   * Show editing dialog
   * @param fields List of fields in variables
   */
  public editResource(fields: Field[]) {
    this.dialog
      .editDialog<T>({
        object: this.resource,
        fields: fields,
      })
      .subscribe((result) => {
        if (result) this.performUpdateRequest(result);
      });
  }

  /**
   * Delete a resource
   * Show confirmation dialog
   */
  public deleteResource() {
    this.dialog.deleteDialog().subscribe((res) => {
      if (res) {
        this.api
          .deleteOne(this.resourceName, this.resource["id"])
          .then(() => this.location.back());
      }
    });
  }

  /**
   * Edit one to many relationship
   * Fetch all the resources from endpoint
   * Filter if there is an existing one
   * Show dialog with select input
   * Send update request to API
   * @param name Name of resource relationship
   * @param current Current value of resource
   * @param nameLabel Label for select list values
   */
  public async editOneToMany<T2>(
    name: string,
    current?: T2,
    nameLabel?: string[]
  ) {
    // Fetch all resources
    let list: T2[];
    await this.api.getAll(`${name}s`).then((o) => (list = o.data));

    // Filter out current value of resource
    if (current) list = list.filter((o) => current["id"] !== o["id"]);

    const field: Field = {
      key: name,
      label: name,
      type: "select",
      options: pluckFields(list, nameLabel || ["name"]),
    };
    this.dialog
      .editDialog<any>({ fields: [field] })
      .subscribe((result) => {
        if (result) this.performUpdateRequest(result);
      });
  }

  /**
   * Edit many to many relationship
   * Fetch all the resources from endpoint
   * Filter if there are existing ones
   * Show dialog with select input
   * Send update request to API
   * @param name Name of resource relationship
   * @param current Current values of resource
   * @param nameLabel Label for select list values
   */
  public async editManyToMany<T2>(
    name: string,
    current?: T2[],
    nameLabel?: string[]
  ) {
    // Fetch all resources
    let list: T2[];
    await this.api.getAll(name).then((o) => (list = o.data));

    // Filter out current values of resource
    const values = pluckFields(current);
    if (current) list = list.filter((o) => !values.includes(o["id"]));

    const field: Field = {
      key: name,
      label: name,
      type: "multiple",
      options: pluckFields(list, nameLabel || ["name"]),
    };
    this.dialog
      .editDialog<any>({ fields: [field] })
      .subscribe((result) => {
        if (result) {
          // Push new values to previous list
          const obj = {};
          values.push(...result[name]);
          obj[name] = values;
          this.performUpdateRequest(obj);
        }
      });
  }

  /**
   * Detach one item from a many-to-many relationship
   * Show confirmation dialog
   * Send update request to API
   * @param name Name of resource relationship
   * @param current Current value of resource
   * @param id ID of value to detach
   * @param nameLabel Label text for current item
   */
  public detachManyToMany<T2>(
    name: string,
    current: T2[],
    id: number,
    labelName?: string
  ) {
    // Build text for the deleting dialog
    const label = labelName || "this item";
    const singName = name.slice(0, -1);
    const text = `Are you sure you want to remove ${label} from the ${singName}?`;

    // Remove value from previous list
    const obj = {};
    const values = pluckFields(current).filter((o) => o !== id);
    obj[name] = values;

    this.dialog.deleteDialog(null, text).subscribe((res) => {
      if (res) this.performUpdateRequest(obj);
    });
  }

  // Perform update request in API with given values
  private performUpdateRequest(values: {}) {
    this.isLoading = true;
    this.api
      .updateOne(this.resourceName, values, this.resource["id"])
      .then((o) => (this.resource = o.data))
      .finally(() => (this.isLoading = false));
  }
}
