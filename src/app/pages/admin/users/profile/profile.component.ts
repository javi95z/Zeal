import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UserService, DialogService } from "@services";
import { User } from "@models";
import { PanelAction, PANEL_ACTIONS, USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-user-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class UserProfileAdminComponent implements OnInit {
  private _user: User;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];

  get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = new User(value);
  }

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
          .then(res => (this.user = res.data))
          .catch(() => (this.error = true))
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
   */
  editUser() {
    this.dialog
      .editDialog<User>({
        object: this.user,
        fields: USER_FIELDS
      })
      .subscribe(user => {
        if (user) {
          this.isLoading = true;
          this.service
            .updateUser(user)
            .then(res => (this.user = res))
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
        this.service.deleteUser(this.user).then(() => this.location.back());
      }
    });
  }
}
