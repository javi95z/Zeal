import { Component, OnInit } from "@angular/core";
import { ProjectService, DialogService } from "@services";
import { TableClass } from "@core/classes/table.class";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsAdminComponent extends TableClass<Project>
  implements OnInit {
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

  constructor(private service: ProjectService, private dialog: DialogService) {
    super();
  }

  ngOnInit() {
    this.initData(this.service.getProjects());
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
        fields: PROJECT_FIELDS
      })
      .subscribe(result =>
        super.updateData(this.service.updateProject(new Project(result)), i)
      );
  }

  /**
   * Confirmation dialog
   * to remove project
   * @param p User
   * @param i Index
   */
  private deleteProject(p: Project, i: number) {
    const project = new Project(p);
    // this.dialog.deleteDialog(project.name).subscribe(res => {
    //   if (res) {
    //     super.deleteData(this.service.deleteProject(project), i);
    //   }
    // });
  }
}
