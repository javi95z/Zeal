import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
})
export class UsersAdmin extends ListClass<User> implements OnInit {
  @Input() project?: number;
  @Input() team?: number;
  @Input() role?: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
    this.columns = ["select", "name", "email", "role", "gender", "actions"];
  }

  ngOnInit() {
    const body = {};
    if (this.project) body["project"] = this.project;
    if (this.team) body["team"] = this.team;
    if (this.role) body["role"] = this.role;
    this.initData(body);
  }

  onAction(action: string, user: User, index: number) {
    switch (action) {
      case "EDIT":
        this.editData(user, user.id, index);
        break;
      case "DELETE":
        this.deleteData(user.id, index, user.name);
        break;
    }
  }

  createUser() {
    const data = {};
    if (this.project) data["projects"] = [this.project];
    if (this.team) data["teams"] = [this.team];
    if (this.role) data["role"] = this.role;
    this.createDialog(data);
  }
}
