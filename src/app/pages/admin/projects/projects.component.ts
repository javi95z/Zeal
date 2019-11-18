import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Project } from "@models";
import { ProjectService } from "@services";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsAdminComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "contact",
    "status",
    "start_date",
    "end_date",
    "actions"
  ];
  dataSource = new MatTableDataSource<Project>();
  selection: SelectionModel<Project>;
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: ProjectService) {}

  ngOnInit() {
    this.initData();
  }

  private initData(): void {
    this.selection = new SelectionModel<Project>(true, []);
    this.service
      .getProjects()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      })
      .finally(() => (this.isLoading = false));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
