import { Component, OnInit, Injector } from "@angular/core";
import { Project, User, Contact } from "@models";
import { DetailClass } from "@core/classes";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
})
export class ProjectProfileAdmin
  extends DetailClass<Project>
  implements OnInit {
  membersCount = 0;
  tasksCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
    this.fields = PROJECT_FIELDS;
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
        this.editResource();
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
    const params = { project: [this.resource.id] };
    this.editManyToMany<User>("users", params);
  }

  /**
   * Edit contact of the project
   */
  editContact = () =>
    this.editOneToMany<Contact>("contact", this.resource?.contact);
}
