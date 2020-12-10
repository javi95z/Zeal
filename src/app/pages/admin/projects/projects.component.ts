import { Component, OnInit, Injector } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsAdmin extends AdminListClass<Project> implements OnInit {
  columns: string[] = [
    "select",
    "name",
    "contact",
    "priority",
    "status",
    "start_date",
    "end_date",
    "actions",
  ];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
  }

  ngOnInit() {
    this.initData();
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
        if (result) super.updateData(result, project.id, i);
      });
  }

  /**
   * Confirmation dialog
   * to remove project
   * @param p Project
   * @param i Index
   */
  private deleteProject(p: Project, i: number) {
    this.dialog.deleteDialog(p.name).subscribe((res) => {
      if (res) this.deleteData(p.id, i);
    });
  }
}
