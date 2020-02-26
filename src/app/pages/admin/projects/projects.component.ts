import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ProjectService, DialogService } from "@services";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

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
    "priority",
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

  constructor(private service: ProjectService, private dialog: DialogService) {}

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
        this.editProject(project, index);
        break;
      // case "DELETE":
      //   this.deleteProjectDialog(project, index);
      //   break;
    }
  }

  /**
   * Show dialog and return updated project
   * Send API request for modification
   * @param project Project
   * @param i Index
   */
  private editProject(project: Project, i: number) {
    this.dialog
      .editDialog<Project>({
        object: project,
        fields: PROJECT_FIELDS
      })
      .subscribe(result => {
        if (result) {
          this.service.updateProject(new Project(project)).then(res => {
            this.dataSource.data[i] = res.data;
            this.dataSource._updateChangeSubscription();
          });
        }
      });
  }
}
