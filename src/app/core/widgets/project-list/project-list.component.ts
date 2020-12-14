import { Component, Input, OnInit } from "@angular/core";
import { Project } from "@models";
import { ApiService } from "@services";

@Component({
  selector: "z-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class ProjectListWidget implements OnInit {
  @Input() user?: number;
  refresh = false;
  masterData: Project[];
  data: Project[];
  filters: string[] = ["open"];

  constructor(private api: ApiService<Project>) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.refresh = true;
    this.api
      .getAll("projects", { user: this.user })
      .then((o) => (this.masterData = o.data))
      .finally(() => {
        this.filterProjects();
        this.refresh = false;
      });
  }

  public filterProjects(status?: string) {
    if (status) {
      var index = this.filters.indexOf(status);
      index === -1 ? this.filters.push(status) : this.filters.splice(index, 1);
    }
    this.data = this.masterData.filter((o) => this.filters.includes(o.status));
  }
}
