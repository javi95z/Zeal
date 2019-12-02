import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { EditUserDialog } from "@pages/admin/users/edit-dialog/edit-dialog.component";
import { UserService, DialogService } from "@services";
import { User } from "@models";

@Component({
  selector: "z-admin-user-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class UserProfileAdminComponent implements OnInit {
  user: User;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private dialog: DialogService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getUser(data.id)
          .then(res => (this.user = new User(res.data)))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Show dialog and return updated user
   * Send API request for modification
   * @param userId Id
   */
  editUser(userId: number) {
    this.dialog.editDialogOld<User>(userId, EditUserDialog).subscribe(user => {
      if (user) {
        this.isLoading = true;
        this.service
          .updateUser(user)
          .then(res => (this.user = res))
          .catch(err => console.error(err))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Show confirm dialog
   * Send API request for deletion
   * @param u User
   */
  deleteUser(u: User) {
    const user = new User(u);
    this.dialog.deleteDialog(user.fullName).subscribe(res => {
      if (res) {
        this.service
          .deleteUser(user)
          .then(() => this.location.back())
          .catch(err => console.error(err));
      }
    });
  }
}
