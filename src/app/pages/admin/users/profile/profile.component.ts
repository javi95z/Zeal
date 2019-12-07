import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UserService, DialogService, TeamService } from "@services";
import { User, Team, PanelAction, Field, Tabs } from "@models";
import { USER_FIELDS, PANEL_ACTIONS } from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class UserProfileAdminComponent implements OnInit {
  private _user: User;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];
  availableTeams: Team[];
  tabs = new Tabs();

  get user(): User {
    return this._user;
  }
  set user(value: User) {
    this._user = new User(value);
  }

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private teams: TeamService,
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

  /**
   * Add teams to user
   */
  async addTeam() {
    // Fetch teams
    this.availableTeams = [];
    await this.teams
      .getTeams()
      .then(o => o.data.filter(t => this.availableTeams.push(new Team(t))));

    // Filter out current teams
    const members = pluckFields(this.user.teams);
    const teamsList = this.availableTeams.filter(o => !members.includes(o.id));

    const teamsField: Field = {
      key: "teams",
      label: "Teams",
      type: "multiple",
      options: pluckFields(teamsList, "name")
    };
    this.dialog
      .editDialog<any>({ fields: [teamsField] })
      .subscribe(result => {
        if (result) {
          this.isLoading = true;
          this.service
            .addTeam(this.user.id, result.teams)
            .then(o => (this.user = o.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }
}
