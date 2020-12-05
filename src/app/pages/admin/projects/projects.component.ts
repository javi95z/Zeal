import { Component, OnInit } from "@angular/core";
import { ApiService, DialogService } from "@services";
import { AdminListClass } from "@core/classes/adminlist";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsAdmin extends AdminListClass<Project> implements OnInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "contact",
    "priority",
    "status",
    "start_date",
    "end_date",
    "actions",
  ];

  constructor(private api: ApiService<Project>, private dialog: DialogService) {
    super();
  }

  ngOnInit() {
    this.initData(this.api.getAll("projects"));
  }

  onAction(action: string, project: Project, index: number) {
    switch (action) {
      case "EDIT":
        this.editProject(project, index);
        break;
      case "DELETE":
        this.deleteProject(project, index);
        break;
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
        fields: PROJECT_FIELDS,
      })
      .subscribe((result) => {
        if (result) {
          this.updateData(
            this.api.updateOne("projects", result, project.id),
            i
          );
        }
      });
  }

  /**
   * Confirmation dialog
   * to remove project
   * @param p Project
   * @param i Index
   */
  private deleteProject(p: Project, i: number) {
    const project = new Project(p);
    this.dialog.deleteDialog(project.name).subscribe((res) => {
      if (res) {
        this.deleteData(this.api.deleteOne("projects", project.id), i);
      }
    });
  }
}
