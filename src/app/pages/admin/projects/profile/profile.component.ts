import { Component, OnInit, Injector } from "@angular/core";
import { Project, User } from "@models";
import { AdminSingleClass } from "@core/classes/adminsingle";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProjectProfileAdmin
  extends AdminSingleClass<Project>
  implements OnInit {
  membersCount = 0;
  tasksCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countMembers = (n: number) => (this.membersCount = n);
  countTasks = (n: number) => (this.tasksCount = n);

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "projects"]);
        break;
      case "EDIT":
        this.editResource(PROJECT_FIELDS);
        break;
      case "DELETE":
        this.deleteResource();
        break;
    }
  }

  /**
   * Remove member from a project
   * @param user User to remove
   */
  removeMember(user: User) {
    this.detachManyToMany("users", this.resource.users, user.id);
  }

  /**
   * Add members to project
   */
  addMember() {
    this.editManyToMany<User>("users", this.resource?.users);
  }
}
