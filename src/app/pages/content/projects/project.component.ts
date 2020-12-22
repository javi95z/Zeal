import { Component, OnInit, Injector } from "@angular/core";
import { AdminSingleClass } from "@core/classes";
import { Project, ProfileBox } from "@models";

@Component({
  selector: "z-project",
  templateUrl: "./project.component.html",
})
export class ProjectComponent
  extends AdminSingleClass<Project>
  implements OnInit {
  tasksCount: number;
  membersCount: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
  }

  ngOnInit() {
    this.getResource();
  }

  protected countTasks = (n: number) => (this.tasksCount = n);
  // protected countMembers = (n: number) => (this.membersCount = n);

  protected buildProfileBox(): ProfileBox {
    if (!this.resource) return;
    const pb = {
      title: this.resource.name,
      resourceName: this.resourceName.slice(0, -1),
      subtitle: this.resource.code,
      icon: "case",
      stats: [{ label: "members", number: this.resource.users.length }],
    };
    if (this.tasksCount)
      pb.stats.push({ label: "tasks", number: this.tasksCount });
    return pb;
  }
}
