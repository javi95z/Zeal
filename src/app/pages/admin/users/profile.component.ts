import { Component, OnInit, Injector } from "@angular/core";
import { User, Team, Role, Project } from "@models";
import { DetailClass } from "@core/classes";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
})
export class UserProfileAdmin extends DetailClass<User> implements OnInit {
  projectsCount = 0;
  teamsCount = 0;
  tasksCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countProjects = (n: number) => (this.projectsCount = n);
  countTeams = (n: number) => (this.teamsCount = n);
  countTasks = (n: number) => (this.tasksCount = n);

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
        this.editResource();
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
    const params = { user: this.resource.id };
    this.editManyToMany<Team>("teams", params);
  }

  /**
   * Add projects to user
   */
  addProject() {
    const params = { user: [this.resource.id] };
    this.editManyToMany<Project>("projects", params);
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
  editRole = () => this.editOneToMany<Role>("role", this.resource?.role);

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
