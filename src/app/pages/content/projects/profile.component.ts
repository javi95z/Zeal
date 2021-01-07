import { Component, OnInit, Injector, ViewChild } from "@angular/core";
import { Project, User } from "@models";
import { DetailClass } from "@core/classes";
import { UserListWidget } from "@core/widgets";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-project",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProjectProfile extends DetailClass<Project> implements OnInit {
  progressData: object;
  tasksCount: number;
  membersCount: number;
  @ViewChild("members") members: UserListWidget;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
  }

  async ngOnInit() {
    await this.getResource();
    this.buildProgressTrack();
  }

  protected countTasks = (n: number) => (this.tasksCount = n);
  protected countMembers = (n: number) => (this.membersCount = n);

  protected buildProfileBox(): object {
    if (!this.resource) return;
    const pb = {
      id: this.resource.id,
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

  protected async buildProgressTrack() {
    let response: object;
    await this.api
      .getCustom(this.resourceName, this.resource.id, "progress")
      .then((o) => (response = o));
    this.progressData = {
      status: response["status"],
      percent: response["percent"],
      data1: {
        label: "Still open",
        value: response["open"],
      },
      data2: {
        label: "Overdue",
        value: response["overdue"],
      },
      data3: {
        label: "Project Status",
        value: response["status"],
      },
    };
  }

  /**
   * Add members to project
   */
  protected addMembers() {
    const params = { project: this.resource.id };
    this.editManyToMany<User>("users", params).then((a) => {
      if (!a) return;
      this.members.refreshData();
    });
  }
}
