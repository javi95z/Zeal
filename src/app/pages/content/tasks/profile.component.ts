import { Component, OnInit, Injector } from "@angular/core";
import { Task, User } from "@models";
import { DetailClass } from "@core/classes";
import { TASK_FIELDS } from "@zeal/variables";
import { Observable } from "rxjs";

@Component({
  selector: "z-task",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.components.scss"],
})
export class TaskProfile extends DetailClass<Task> implements OnInit {
  hasPermissions: Observable<boolean>;
  currentUser: User;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
    this.fields = TASK_FIELDS;
    this.auth.user$.subscribe((e) => (this.currentUser = e));
  }

  async ngOnInit() {
    await this.getResource();
    this.hasPermissions = this.checkPermissions();
  }

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
          // { label: "tasks", number: this.tasksCount | 0 },
          // { label: "members", number: this.membersCount | 0 },
        ],
      };
      observer.next(pb);
    });
  }

  protected buildTextBox(): Observable<object> {
    return new Observable((observer) => {
      if (_.isEmpty(this.resource.description)) observer.next(null);
      const res = {
        title: "Description",
        text: this.resource.description,
      };
      observer.next(res);
    });
  }

  /**
   * Check if user has permissions on this resource
   */
  protected checkPermissions(): Observable<boolean> {
    return new Observable((observer) => {
      if (!this.resource && !this.currentUser) observer.next(false);
      const isOwnProject = _.find(this.currentUser.projects, {
        id: this.resource.project.id,
      });
      const isOwnTask = _.find(this.currentUser.tasks, {
        id: this.resource.id,
      });
      observer.next(!!isOwnTask || !!isOwnProject);
    });
  }

  protected editOwner = () =>
    this.editOneToMany<User>("user", this.resource?.user);
}
