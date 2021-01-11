import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { User, Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsComponent extends ListClass<Project> implements OnInit {
  @Input() canCreate = true;
  @Input() canRefresh = true;
  currentUser: User;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
    this.columns = [
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
    this.auth.user$.subscribe((e) => {
      this.currentUser = e;
      this.loadData();
    });
  }

  protected loadData() {
    this.isLoading = true;
    this.initData(this.buildParams());
  }

  // Build parameters to fetch data from API
  private buildParams(): object {
    return {
      user: this.currentUser ? [this.currentUser.id] : null,
    };
  }
}
