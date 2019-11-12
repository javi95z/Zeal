import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { EditUserDialog } from "../edit-dialog/edit-dialog.component";
import { UserService } from "../../../../services";
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
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getUser(data.id)
          .then(res => (this.user = new User(res)))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  editUserDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialog, {
      panelClass: "modal-dialog-box",
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) this.updateUser(result);
    });
  }

  /**
   * Update user from table
   * API request for modification
   * @param user User
   */
  updateUser(user: User) {
    this.isLoading = true;
    this.service
      .updateUser(user)
      .then(res => {
        this.user = new User(res);
        this.service.onUserUpdated(new User(res));
      })
      .catch(err => console.error(err))
      .finally(() => this.isLoading = false);
  }
}
