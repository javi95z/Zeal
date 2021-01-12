import { Component, Input, OnInit, Injector } from "@angular/core";
import { Project } from "@models";
import { DataWidgetClass } from "@core/classes/datawidget";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class ProjectListWidget
  extends DataWidgetClass<Project>
  implements OnInit {
  @Input() user?: number;
  data: Project[];
  filters: string[] = [];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
  }

  ngOnInit(): void {
    this.params = {
      limit: this.limit || null,
      user: [this.user],
    };
    this.refreshData();
  }

  public refreshData() {
    this.refresh = true;
    this.loadData()
      .then((o) => (this.data = o))
      .finally(() => this.filterProjects());
  }

  createNew() {
    const body = { users: [this.user] };
    super.createNew(body);
  }

  protected filterProjects(status?: string) {
    if (status) {
      var index = this.filters.indexOf(status);
      index === -1 ? this.filters.push(status) : this.filters.splice(index, 1);
    }
    this.data = this.masterData.filter((o) => !this.filters.includes(o.status));
  }
}
