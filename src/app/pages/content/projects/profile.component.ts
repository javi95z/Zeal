import { Component, OnInit, Injector, ViewChild } from "@angular/core";
import { Project, User } from "@models";
import { DetailClass } from "@core/classes";
import { UserListWidget } from "@core/widgets";
import { PROJECT_FIELDS } from "@zeal/variables";
import { Observable } from "rxjs";

@Component({
  selector: "z-project",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProjectProfile extends DetailClass<Project> implements OnInit {
  hasPermissions: Observable<boolean>;
  currentUser: User;
  progressData: object;
  tasksCount: number;
  membersCount: number;
  hoursManagement: object;
  @ViewChild("members") members: UserListWidget;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
    this.auth.user$.subscribe((e) => (this.currentUser = e));
  }

  async ngOnInit() {
    await this.getResource();
    this.buildProgressTrack();
    this.hasPermissions = this.checkPermissions();
  }

  protected countTasks = (n: number) => (this.tasksCount = n);
  protected countMembers = (n: number) => (this.membersCount = n);
  protected countHours = (n: object) => (this.hoursManagement = n);

  protected buildProfileBox(): Observable<object> {
    return new Observable((observer) => {
      if (!this.resource) observer.next(null);
      const pb = {
        id: this.resource.id,
        title: this.resource.name,
        resourceName: this.resourceName.slice(0, -1),
        subtitle: this.resource.code,
        icon: "case",
        stats: [
          { label: "tasks", number: this.tasksCount | 0 },
          { label: "members", number: this.membersCount | 0 },
        ],
      };
      observer.next(pb);
    });
  }

  protected async buildProgressTrack() {
    let response: object;
    await this.api
      .getCustom(this.resourceName, this.resource.id, "progress")
      .then((o) => (response = o));
    if (!response) return;
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

  /**
   * Check if user has permissions on this resource
   */
  protected checkPermissions(): Observable<boolean> {
    return new Observable((observer) => {
      if (!this.resource && !this.currentUser) observer.next(false);
      const isOwnProject = (id: number) =>
        this.currentUser.projects.find((o) => o.id === id);
      observer.next(!!isOwnProject(this.resource.id));
    });
  }
}
