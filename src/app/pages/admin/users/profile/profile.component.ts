import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService, DialogService } from "@services";
import { User, Team, PanelAction, Field, Tabs, Role } from "@models";
import { USER_FIELDS, PANEL_ACTIONS } from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class UserProfileAdmin implements OnInit {
  private _user: User;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];
  tabs = new Tabs();

  get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = new User(value);
  }

  constructor(
    private api: ApiService<any>,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.api
          .getOne("users", data.id)
          .then((res) => (this.user = res.data))
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
    return PANEL_ACTIONS.filter((o) => actions.includes(o.action));
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
        fields: USER_FIELDS,
      })
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.api
            .updateOne("users", result, this.user.id)
            .then((res) => (this.user = res.data))
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
    this.dialog.deleteDialog(this.user.fullName).subscribe((res) => {
      if (res) {
        this.api
          .deleteOne("users", this.user.id)
          .then(() => this.location.back());
      }
    });
  }

  /**
   * Add teams to user
   */
  async addTeam() {
    // Fetch teams
    let availableTeams: Team[];
    await this.api.getAll("teams").then((o) => (availableTeams = o.data));

    // Filter out current teams
    const teams = pluckFields(this.user.teams);
    const teamsList = availableTeams.filter((o) => !teams.includes(o.id));

    const teamsField: Field = {
      key: "teams",
      label: "Teams",
      type: "multiple",
      options: pluckFields(teamsList, ["name"]),
    };
    this.dialog
      .editDialog<any>({ fields: [teamsField] })
      .subscribe((result) => {
        if (result) {
          teams.push(...result.teams);
          this.isLoading = true;
          this.api
            .updateOne("users", { teams }, this.user.id)
            .then((o) => (this.user = o.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  /**
   * Remove user from a team
   * @param team Team to remove
   */
  removeTeam(team: Team) {
    const text = `Are you sure you want to remove the user ${this.user.fullName} from ${team.name}`;
    const teams = pluckFields(this.user.teams).filter((o) => o !== team.id);

    this.dialog.deleteDialog(null, text).subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.api
          .updateOne("users", { teams }, this.user.id)
          .then((o) => (this.user = o.data))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Edit role of the user
   */
  async editRole() {
    // Fetch roles
    let roleList: Role[] = [];
    await this.api.getAll("roles").then((o) => (roleList = o.data));

    // Filter out current role
    if (this.user.role) {
      roleList = roleList.filter((o) => this.user.role.id !== o.id);
    }

    const roleField: Field = {
      key: "role",
      label: "Role",
      type: "select",
      options: pluckFields(roleList, ["name"]),
    };
    this.dialog
      .editDialog<any>({ fields: [roleField] })
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.api
            .updateOne("users", result, this.user.id)
            .then((o) => (this.user = o.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  /**
   * Activate a disabled user
   * or deactivate an enabled user
   */
  toggleActive() {
    const obj = { active: !this.user.active };
    this.isLoading = true;
    this.api
      .updateOne("users", obj, this.user.id)
      .then((o) => (this.user = o.data))
      .finally(() => (this.isLoading = false));
  }
}
