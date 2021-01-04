import { Component, OnInit, Injector, Input } from "@angular/core";
import { ListClass } from "@core/classes";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsAdmin extends ListClass<Project> implements OnInit {
  @Input() user?: number;
  @Input() contact?: number;

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

  async ngOnInit() {
    const body = {
      user: this.user ? [this.user] : null,
      contact: this.contact ? this.contact : null,
    };
    this.initData(body);
  }

  createProject() {
    const data = {
      contact: this.contact || null,
    };
    this.createData(data);
  }
}
