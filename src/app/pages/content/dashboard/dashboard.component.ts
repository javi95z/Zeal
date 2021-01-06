import { Component, Injector } from "@angular/core";
import { User } from "@models";
import { MasterClass } from "@core/classes";

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent extends MasterClass<User> {
  user: User;

  constructor(injector: Injector) {
    super(injector);
    this.auth.user$.subscribe((o) => (this.user = o));
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
}
