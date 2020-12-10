import { SelectionModel } from "@angular/cdk/collections";
import {
  ViewChild,
  Input,
  Output,
  Injector,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ApiService, DialogService } from "@services";

export class AdminListClass<T> {
  @Input() hideCols?: string[];
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
   * @param request API request to load data
   */
  public initData(request: Promise<any>): void {
    this.selection = new SelectionModel<T>(true, []);
    request
      .then((res) => this.renderView(res.data))
      .finally(() => (this.isLoading = false));
  }

  /**
   * Initialize the material datasource
   * and its components with data
   * @param data Data retrieved from APi
   */
  public renderView(data: T[]) {
    this.selection = new SelectionModel<T>(true, []);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    this.isLoading = false;
  }

  /**
   * Add new information to the table
   * @param data New data
   */
  public addData(data: T) {
    this.dataSource.data.push(data);
    this.dataSource._updateChangeSubscription();
  }

  /**
   * Send API request to update information
   * and change it on the table too
   * @param request API request to update data
   * @param index Index of the table row
   */
  public updateData(request: Promise<any>, index: number) {
    request
      .then((res) => {
        this.dataSource.data[index] = res.data;
        this.dataSource._updateChangeSubscription();
      })
      .catch((err) => console.error(err.error));
  }

  /**
   * Send API request to delete information
   * and remove it from the table too
   * @param request API request to remove data
   * @param index Index of the table row
   */
  public deleteData(request: Promise<any>, index: number) {
    request
      .then(() => {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      })
      .catch((err) => console.error(err));
  }
}
