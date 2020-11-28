import { Component, OnInit } from "@angular/core";
import { UserService, DialogService } from "@services";
import { AdminListClass } from "@core/classes/adminlist";
import { User } from "@models";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersAdminComponent extends AdminListClass<User>
  implements OnInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "email",
    "role",
    "gender",
    "actions"
  ];

  constructor(private service: UserService, private dialog: DialogService) {
    super();
  }

  ngOnInit() {
    this.initData(this.service.getUsers());
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
        fields: USER_FIELDS
      })
      .subscribe((o: User) => {
        if (o) this.service.createUser(o).then(res => super.addData(res.data));
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
        fields: USER_FIELDS
      })
      .subscribe(result => {
        if (result) {
          super.updateData(this.service.updateUser(result, user.id), i);
        }
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
    this.dialog.deleteDialog(user.fullName).subscribe(res => {
      if (res) {
        super.deleteData(this.service.deleteUser(user), i);
      }
    });
  }
}
