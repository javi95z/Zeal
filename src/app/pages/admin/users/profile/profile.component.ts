import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { EditUserDialog } from "@pages/admin/users/edit-dialog/edit-dialog.component";
import { UserService, DialogService } from "@services";
import { User } from "@models";
import { PanelAction, PANEL_ACTIONS } from "@zeal/variables";

@Component({
  selector: "z-admin-user-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class UserProfileAdminComponent implements OnInit {
  user: User;
  isLoading = true;
  menu: PanelAction[];

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private dialog: DialogService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getUser(data.id)
          .then(res => (this.user = new User(res.data)))
          .finally(() => {
            this.isLoading = false;
            this.menu = this.buildMenu();
          });
      }
    });
  }

  buildMenu(): PanelAction[] {
    const actions = ["EDIT", "LIST", "DELETE"];
    return PANEL_ACTIONS.filter(o => actions.includes(o.action));
  }

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "users"]);
        break;
      case "DELETE":
        this.deleteUser();
        break;
      case "EDIT":
        this.editUser();
        break;
    }
  }

  /**
   * Show dialog and return updated user
   * Send API request for modification
   * @param userId Id
   */
  editUser() {
    this.dialog
      .editDialogOld<User>(this.user.id, EditUserDialog)
      .subscribe(user => {
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
  deleteUser() {
    this.dialog.deleteDialog(this.user.fullName).subscribe(res => {
      if (res) {
        this.service
          .deleteUser(this.user)
          .then(() => this.location.back())
          .catch(err => console.error(err));
      }
    });
  }
}
