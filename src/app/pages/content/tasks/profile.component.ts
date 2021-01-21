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
        icon: "arrow-merge",
        stats: [
          {
            label: "estimated hours",
            number: this.resource.estimated_hours | 0,
          },
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

  /**
   * Get difference between two dates
   * @param start Start date
   * @param end End date
   */
  protected getDateDifference(start: string, end: string): Observable<string> {
    return new Observable((observer) => {
      if (_.isEmpty(start) || _.isEmpty(end)) return null;
      const getDiff = (n, e): number[] => [Math.floor(n / e), n % e];
      const getLabel = (n: number, t: string) => `${n} ${n == 1 ? t : t + "s"}`;
      const dif = new Date(end).getTime() - new Date(start).getTime();
      let res = dif / (1000 * 3600 * 24);
      const text: string[] = [];
      if (res >= 365) {
        const [years, left] = getDiff(res, 365);
        text.push(getLabel(years, "year"));
        res = left;
      }
      if (res >= 30) {
        const [months, left] = getDiff(res, 30);
        text.push(getLabel(months, "month"));
        res = left;
      }
      if (res >= 7) {
        const [weeks, left] = getDiff(res, 7);
        text.push(getLabel(weeks, "week"));
        res = left;
      }
      if (res) {
        const [days, left] = getDiff(res, 1);
        text.push(getLabel(days, "day"));
        res = left;
      }
      observer.next(text.join(", "));
    });
  }
}
