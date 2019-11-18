import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { EditProjectDialog } from "./edit-dialog/edit-dialog.component";
import { ProjectService, ToastService } from "@services";
import { Project } from "@models";

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

  constructor(
    private service: ProjectService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initData();
  }

  private initData(): void {
    this.selection = new SelectionModel<Project>(true, []);
    this.service
      .getProjects()
      .then(res => {
        this.dataSource = new MatTableDataSource(res.data);
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

  onAction(action: string, project: Project, index: number) {
    switch (action) {
      case "EDIT":
        this.editProjectDialog(project, index);
        break;
      // case "DELETE":
      //   this.deleteProjectDialog(project, index);
      //   break;
    }
  }

  private editProjectDialog(project: Project, i: number) {
    const dialogRef = this.dialog.open(EditProjectDialog, {
      panelClass: "modal-dialog-box",
      data: project
    });

    dialogRef.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.updateProject(result, i);
      }
    });
  }

  /**
   * Update user from table
   * API request for modification
   * @param user User
   */
  private updateProject(project: Project, i: number) {
    this.service
      .updateProject(new Project(project))
      .then(res => {
        this.dataSource.data[i] = res;
        this.dataSource._updateChangeSubscription();
        this.toast.setMessage(`Project ${project.name} updated successfully.`);
      })
      .catch(err => console.error(err));
  }
}
