import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { EditUserDialog } from "../edit-dialog/edit-dialog.component";
import { UserService, ToastService } from "../../../../services";
import { User } from "../../../../models";

@Component({
  selector: "z-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: User;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getUser(data.id)
          .then(res => (this.user = new User(res)))
          .finally(() => {
            this.isLoading = false;
            console.log(this.user);
          });
      }
    });
  }

  editUserDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialog, {
      panelClass: "modal-dialog-box",
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

  /**
   * Update user from table
   * API request for modification
   * @param user User
   */
  updateUser(user: User) {
    this.service
      .updateUser(user)
      .then(() => this.service.onUserUpdated(new User(user)))
      .catch(err => console.error(err));
  }
}
