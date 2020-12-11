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
  }

  ngOnInit() {
    const body = this.project_id ? { project: this.project_id } : null;
    this.initData(body);
  }

  onAction(action: string, user: User, index: number) {
    switch (action) {
      case "EDIT":
        this.editUser(user, index);
        break;
      case "DELETE":
        this.deleteUser(user, index);
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

  /**
   * Show dialog and return updated user
   * Send API request for modification
   * @param user User
   * @param i Table index
   */
  private editUser(user: User, i: number) {
    this.dialog
      .editDialog<User>({
        object: user,
        fields: USER_FIELDS,
      })
      .subscribe((result) => {
        if (result) super.updateData(result, user.id, i);
      });
  }

  /**
   * Confirmation dialog
   * to remove user
   * @param u User
   * @param i Index
   */
  private deleteUser(u: User, i: number) {
    const user = new User(u);
    this.dialog.deleteDialog(user.name).subscribe((res) => {
      if (res) super.deleteData(user.id, i);
    });
  }
}
