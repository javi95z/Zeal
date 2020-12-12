import { Component, OnInit, Input, Injector } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
})
export class UsersAdmin extends AdminListClass<User> implements OnInit {
  @Input() project?: number;
  @Input() team?: number;
  columns: string[] = ["select", "name", "email", "role", "gender", "actions"];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
  }

  ngOnInit() {
    const body = {};
    if (this.project) body["project"] = this.project;
    if (this.team) body["team"] = this.team;
    this.initData(body);
  }

  onAction(action: string, user: User, index: number) {
    switch (action) {
      case "EDIT":
        super.editDialog(user, user.id, index);
        break;
      case "DELETE":
        super.deleteDialog(user.id, index, user.name);
        break;
    }
  }

  createUser() {
    const data = {};
    if (this.project) data["projects"] = [this.project];
    if (this.team) data["teams"] = [this.team];
    this.createDialog(data);
  }
}
