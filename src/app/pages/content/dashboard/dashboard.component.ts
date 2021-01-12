import { Component, Injector } from "@angular/core";
import { User, ActivityLog } from "@models";
import { MasterClass } from "@core/classes";
import { USER_FIELDS, DASHBOARD_SETTINGS } from "@zeal/variables";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent extends MasterClass<User> {
  settings = DASHBOARD_SETTINGS;
  user: User;
  activityLogs: Observable<ActivityLog>;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
    this.auth.user$.subscribe((o) => {
      this.user = o;
      this.getTimeline();
    });
  }

  protected buildProfileBox(): object {
    if (!this.user) return;
    const pb = {
      id: this.user.id,
      title: this.user.name,
      subtitle: this.user.role?.name,
      profileImage: this.user.profile_img,
    };
    return pb;
  }

  protected editCurrentUser() {
    this.editDialog(this.user, this.user.id).finally(() => this.auth.getUser());
  }

  protected getTimeline() {
    const body = { amount: this.settings.activity_items || null };
    this.activityLogs = this.api.getActivityLogs(this.user.id, body);
  }
}
