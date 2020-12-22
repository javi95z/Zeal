import { Injector, Input } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { MasterClass } from "./master";
import { Tabs, Field, PanelAction } from "@models";
import { PANEL_ACTIONS } from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

export class DetailClass<T> extends MasterClass<T> {
  private _resource: T;
  route: ActivatedRoute;
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

  constructor(injector: Injector) {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.location = injector.get(Location);
  }

  // Get one resource from route parameters
  public async getResource(): Promise<T> {
    const id = this.route.snapshot.params.id;
    if (!id) return;
    await this.api
      .getOne(this.resourceName, id)
      .then((res) => (this.resource = res.data as T))
      .catch(() => (this.error = true))
      .finally(() => (this.isLoading = false));
    return this.resource || null;
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
  public editResource() {
    this.dialog
      .editDialog<T>({
        object: this.resource,
        fields: this.fields,
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
    this.deleteDialog(
      this.resource["id"],
      this.resource["name"] || null
    ).then(() => this.location.back());
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
   * @param params Params for fetching current values
   */
  public async editManyToMany<T2>(name: string, params: object): Promise<T2> {
    // Fetch all resources
    let list: T2[];
    await this.api.getAll(name).then((o) => (list = o.data));

    // Fetch current values
    let current: T2[];
    await this.api.getAll(name, params).then((o) => (current = o.data));

    // Filter out current values of resource
    const values = pluckFields(current);
    if (current) list = list.filter((o) => !values.includes(o["id"]));

    const field: Field = {
      key: name,
      label: name,
      type: "multiple",
      options: pluckFields(list, ["name"]),
    };
    return this.dialog
      .editDialog<any>({ fields: [field] })
      .toPromise()
      .then((result) => {
        if (!result) return;
        // Push new values to previous list
        const obj = {};
        values.push(...result[name]);
        obj[name] = values;
        const res = this.performUpdateRequest<T2>(obj);
        return res;
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
  private async performUpdateRequest<T>(values: {}): Promise<T> {
    this.isLoading = true;
    let response: T;
    await this.api
      .updateOne(this.resourceName, values, this.resource["id"])
      .then((o) => (this.resource = response = o.data))
      .finally(() => (this.isLoading = false));
    return response;
  }
}
