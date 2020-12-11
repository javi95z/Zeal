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
    this.fields = PROJECT_FIELDS;
  }

  ngOnInit() {
    this.initData();
  }

  onAction(action: string, project: Project, index: number) {
    switch (action) {
      case "EDIT":
        super.editDialog(project, project.id, index);
        break;
      case "DELETE":
        super.deleteDialog(project.id, index, project.name);
        break;
    }
  }
}
