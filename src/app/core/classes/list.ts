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
import { MatSort, Sort } from "@angular/material/sort";
import { MasterClass } from "./master";

export class ListClass<T> extends MasterClass<T> {
  @Input() hideCols?: string[];
  @Output() countValues = new EventEmitter<number>();
  public columns: string[];
  public meta: object[];
  selection: SelectionModel<T>;
  dataSource = new MatTableDataSource<T>();
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(injector: Injector) {
    super(injector);
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
   * Sort data table by a given column
   * @param sort Object with sorting column and direction
   */
  public sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") return;
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      if (sort.active.includes("date") && sort.direction === "desc") {
        const getTime = (e) => new Date(e["created_at"]).getTime();
        return this.compare(getTime(a), getTime(b), isAsc);
      } else {
        return this.compare(a[sort.active], b[sort.active], isAsc);
      }
    });
  }

  /**
   * Retrieve data from the API
   * and render it
   * @param obj Optional body for the request
   */
  public async initData(body?: object): Promise<boolean> {
    if (this.hideCols)
      this.columns = this.columns.filter((o) => !this.hideCols.includes(o));
    this.selection = new SelectionModel<T>(true, []);
    await this.api
      .getAll(this.resourceName, body || null)
      .then((res) => {
        this.renderView(res.data);
        if (res.meta) this.meta = res.meta;
      })
      .finally(() => (this.isLoading = false));
    return true;
  }

  /**
   * Perform different actions on a table row resource
   * @param action Name of action clicked
   * @param resource Resource to perform action to
   * @param index Table row index
   */
  public onAction(action: string, resource: T, index: number) {
    switch (action) {
      case "FAVORITE":
        this.toggleFavorite(resource["id"]);
        break;
      case "EDIT":
        this.editData(resource, resource["id"], index);
        break;
      case "DELETE":
        this.deleteData(resource["id"], index, resource["name"]);
        break;
    }
  }

  /**
   * Filter data in datasource records
   * @param query Text string from the input
   */
  public doFilter = (query: string) =>
    (this.dataSource.filter = query.trim().toLocaleLowerCase());

  /**
   * Initialize the material datasource
   * and its components with data
   * @param data Data retrieved from APi
   */
  public renderView(data: T[]) {
    this.selection = new SelectionModel<T>(true, []);
    this.countValues.emit(data.length);
    this.dataSource = new MatTableDataSource(data.slice());
    this.dataSource.sort = this.sort;
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    this.isLoading = false;
  }

  /**
   * Send API request to create information
   * and add it to the table too
   */
  protected async createData(
    params?: object
  ): Promise<{ data: T; index: number }> {
    let response = {
      data: {} as T,
      index: null,
    };
    await this.createDialog(params).then((res) => {
      if (!res) return;
      response.data = res.data;
      response.index = this.addDataTable(res.data);
    });
    return new Promise((resolve) => resolve(response));
  }

  /**
   * Send API request to update information
   * and change it on the table too
   * @param resource New resource data to update
   * @param id Id of resource to update
   * @param index Index of the table row
   */
  protected editData(resource: T, id: number, index: number) {
    this.editDialog(resource, id).then((res) => {
      if (!res) return;
      const pg = this.paginator;
      index = pg.pageIndex * pg.pageSize + index;
      this.editDataTable(res.data, index);
    });
  }

  /**
   * Send API request to delete information
   * and remove it from the table too
   * @param id Id of resource to delete
   * @param index Index of the table row
   */
  protected deleteData(id: number, index: number, label?: string) {
    this.deleteDialog(id, label).then((a) => {
      if (!a) return;
      const pg = this.paginator;
      const data = this.dataSource.data;
      data.splice(pg.pageIndex * pg.pageSize + index, 1);
      this.renderView(data);
    });
  }

  /**
   * Add new information to the table
   * @param element New data
   */
  private addDataTable(element: T): number {
    if (!element) return;
    const data = this.dataSource.data;
    const index = data.push(element) - 1;
    this.renderView(data);
    return index;
  }

  /**
   * Edit a row from the table
   * @param element New data
   * @param index Row index
   */
  protected editDataTable(element: T, index: number) {
    this.dataSource.data[index] = element;
    this.dataSource._updateChangeSubscription();
  }

  private compare = (a: number | string, b: number | string, isAsc: boolean) =>
    (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
