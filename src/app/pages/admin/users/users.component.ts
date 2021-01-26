import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
})
export class UsersAdmin extends ListClass<User> implements OnInit {
  @Input() projects: number[];
  @Input() teams: number[];
  @Input() role: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
    this.columns = ["select", "name", "email", "role", "gender", "actions"];
  }

  ngOnInit() {
    const body = {};
    if (this.projects) body["project"] = [this.projects];
    if (this.teams) body["team"] = [this.teams];
    if (this.role) body["role"] = this.role;
    this.initData(body);
  }

  createUser() {
    const data = {};
    if (this.projects) data["projects"] = [this.projects];
    if (this.teams) data["teams"] = [this.teams];
    if (this.role) data["role"] = this.role;
    this.createDialog(data);
  }
}
