import { Component, OnInit, Input, Injector } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
})
export class UsersAdmin extends AdminListClass<User> implements OnInit {
  @Input() project_id?: number;
  columns: string[] = ["select", "name", "email", "role", "gender", "actions"];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
  }

  ngOnInit() {
    const body = this.project_id ? { project: this.project_id } : null;
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
    this.dialog
      .editDialog<User>({
        object: null,
        fields: USER_FIELDS,
      })
      .subscribe((o: User) => {
        if (o) {
          if (this.project_id) o.projects = [this.project_id];
          super.createData(o);
        }
      });
  }
}
