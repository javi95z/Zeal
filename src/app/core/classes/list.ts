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

  public sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") return;
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      return this.compare(a[sort.active], b[sort.active], isAsc);
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
   * Send API request to create information
   * and add it to the table too
   */
  protected createData() {
    this.createDialog().then((res) => {
      if (!res) return;
      this.addDataTable(res.data);
    });
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
      this.dataSource.data[index] = res.data;
      this.dataSource._updateChangeSubscription();
    });
  }

  /**
   * Send API request to delete information
   * and remove it from the table too
   * @param id Id of resource to delete
   * @param index Index of the table row
   */
  protected deleteData(id: number, index: number, label?: string) {
    this.deleteDialog(id, label).then(() => {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  /**
   * Add new information to the table
   * @param data New data
   */
  private addDataTable(data: T) {
    this.dataSource.data.push(data);
    this.dataSource._updateChangeSubscription();
  }

  private compare = (a: number | string, b: number | string, isAsc: boolean) =>
    (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
