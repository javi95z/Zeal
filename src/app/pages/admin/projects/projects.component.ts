import { Component, OnInit, Injector, Input } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsAdmin extends AdminListClass<Project> implements OnInit {
  @Input() user?: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
    this.columns = [
      "select",
      "name",
      "contact",
      "priority",
      "status",
      "start_date",
      "end_date",
      "actions",
    ];
  }

  ngOnInit() {
    const body = {};
    if (this.user) body["user"] = this.user;
    this.initData(body);
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
