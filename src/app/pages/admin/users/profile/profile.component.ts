import { Component, OnInit, Injector } from "@angular/core";
import { User, Team, Role } from "@models";
import { AdminSingleClass } from "@core/classes/adminsingle";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class UserProfileAdmin extends AdminSingleClass<User> implements OnInit {
  tasksCount = 0;
  teamsCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countTasks = (n: number) => (this.tasksCount = n);
  countTeams = (n: number) => (this.teamsCount = n);

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "users"]);
        break;
      case "EDIT":
        this.editResource(USER_FIELDS);
        break;
      case "DELETE":
        this.deleteResource();
        break;
    }
  }

  /**
   * Add teams to user
   */
  addTeam() {
    this.editManyToMany<Team>("teams", this.resource?.teams);
  }

  /**
   * Remove user from a team
   * @param team Team to remove
   */
  removeTeam(team: Team) {
    this.detachManyToMany(
      "teams",
      this.resource.teams,
      team.id,
      this.resource.name
    );
  }

  /**
   * Edit role of the user
   */
  editRole() {
    this.editOneToMany<Role>("role", this.resource?.role);
  }

  /**
   * Activate a disabled user
   * or deactivate an enabled user
   */
  toggleActive() {
    const obj = { active: !this.resource.active };
    this.isLoading = true;
    this.api
      .updateOne("users", obj, this.resource.id)
      .then((o) => (this.resource = o.data))
      .finally(() => (this.isLoading = false));
  }
}
