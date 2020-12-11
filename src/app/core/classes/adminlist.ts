import {
  ViewChild,
  Input,
  Output,
  EventEmitter,
  Injector,
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Field } from "@models";
import { ApiService, DialogService } from "@services";
import { reduceObject } from "@zeal/utils";

export class AdminListClass<T> {
  @Input() hideCols?: string[];
  @Output() countValues = new EventEmitter<number>();
  public resourceName: string;
  public fields: Field[];
  api: ApiService<T>;
  dialog: DialogService;
  selection: SelectionModel<T>;
  dataSource = new MatTableDataSource<T>();
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private injectorObj: Injector) {
    this.api = this.injectorObj.get(ApiService);
    this.dialog = this.injectorObj.get(DialogService);
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /**
   * Retrieve data from the API
   * and render it
   * @param obj Optional body for the request
   */
  public async initData(body?: object): Promise<boolean> {
    this.selection = new SelectionModel<T>(true, []);
    await this.api
      .getAll(this.resourceName, body || null)
      .then((res) => this.renderView(res.data))
      .finally(() => (this.isLoading = false));
    return true;
  }

  /**
   * Initialize the material datasource
   * and its components with data
   * @param data Data retrieved from APi
   */
  public renderView(data: T[]) {
    this.selection = new SelectionModel<T>(true, []);
    this.countValues.emit(data.length);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    this.isLoading = false;
  }

  /**
   * Show dialog and return new resource
   * Add aditional data if existent
   * Send API request for modification
   * @param extraData Aditional data
   */
  public createDialog(extraData?: object) {
    this.dialog
      .editDialog<T>({
        object: null,
        fields: this.fields,
      })
      .subscribe((o: T) => {
        if (extraData) Object.assign(o, reduceObject(extraData));
        this.createData(o);
      });
  }

  /**
   * Send API request to create information
   * and add it to the table too
   * @param resource New resource data to create
   */
  private createData(resource: T) {
    this.api
      .createOne(this.resourceName, resource)
      .then((res) => this.addDataTable(res.data));
  }

  /**
   * Show dialog and return updated resource
   * Send API request for modification
   * @param resource New resource data to update
   * @param id Id of resource to update
   * @param index Index of the table row
   */
  public editDialog(resource: T, id: number, index: number) {
    this.dialog
      .editDialog<T>({
        object: resource,
        fields: this.fields,
      })
      .subscribe((o: T) => {
        if (o) this.editData(o, id, index);
      });
  }

  /**
   * Send API request to update information
   * and change it on the table too
   * @param resource New resource data to update
   * @param id Id of resource to update
   * @param index Index of the table row
   */
  private editData(resource: T, id: number, index: number) {
    this.api
      .updateOne(this.resourceName, resource, id)
      .then((res) => {
        this.dataSource.data[index] = res.data;
        this.dataSource._updateChangeSubscription();
      })
      .catch((err) => console.error(err.error));
  }

  /**
   * Confirmation dialog
   * to remove user
   * @param id Id of resource to delete
   * @param index Index of the table row
   */
  public deleteDialog(id: number, index: number, label?: string) {
    this.dialog.deleteDialog(label).subscribe((res) => {
      if (res) this.deleteData(id, index);
    });
  }

  /**
   * Send API request to delete information
   * and remove it from the table too
   * @param id Id of resource to delete
   * @param index Index of the table row
   */
  private deleteData(id: number, index: number) {
    this.api
      .deleteOne(this.resourceName, id)
      .then(() => {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      })
      .catch((err) => console.error(err));
  }

  /**
   * Add new information to the table
   * @param data New data
   */
  private addDataTable(data: T) {
    this.dataSource.data.push(data);
    this.dataSource._updateChangeSubscription();
  }
}
