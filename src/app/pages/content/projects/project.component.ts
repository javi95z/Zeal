import { Component, OnInit, Injector, ViewChild } from "@angular/core";
import { Project, ProfileBox, User } from "@models";
import { AdminSingleClass } from "@core/classes";
import { UserListWidget } from "@core/widgets";

@Component({
  selector: "z-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent
  extends AdminSingleClass<Project>
  implements OnInit {
  tasksCount: number;
  membersCount: number;
  @ViewChild("members") members: UserListWidget;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
  }

  ngOnInit() {
    this.getResource();
  }

  protected countTasks = (n: number) => (this.tasksCount = n);
  protected countMembers = (n: number) => (this.membersCount = n);

  protected buildProfileBox(): ProfileBox {
    if (!this.resource) return;
    const pb = {
      title: this.resource.name,
      resourceName: this.resourceName.slice(0, -1),
      subtitle: this.resource.code,
      icon: "case",
      stats: [],
    };
    if (this.tasksCount)
      pb.stats.push({ label: "tasks", number: this.tasksCount });
    if (this.membersCount)
      pb.stats.push({ label: "members", number: this.membersCount });
    return pb;
  }

  /**
   * Add members to project
   */
  protected addMembers() {
    this.editManyToMany<User>("users", this.resource?.users).then((a) => {
      if (!a) return;
      this.members.refreshData();
    });
  }
}
