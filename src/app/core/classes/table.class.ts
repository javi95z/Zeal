import { SelectionModel } from "@angular/cdk/collections";
import { ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

export class TableClass<T> {
  selection: SelectionModel<T>;
  dataSource = new MatTableDataSource<T>();
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Initialize the material datasource
   * and its components with the data
   * retrieved from the API
   * @param request API request to load data
   */
  public initData(request: Promise<any>): void {
    this.selection = new SelectionModel<T>(true, []);
    request
      .then(res => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      })
      .finally(() => (this.isLoading = false));
  }

  /**
   * Send API request to update information
   * and change it on the table too
   * @param request API request to update data
   * @param index Index of the table row
   */
  public updateData(request: Promise<any>, index: number) {
    request.then(res => {
      this.dataSource.data[index] = res.data;
      this.dataSource._updateChangeSubscription();
    });
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
      .catch(err => console.error(err));
  }
}
