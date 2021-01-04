import { Component, OnInit, Injector } from "@angular/core";
import { Team, User } from "@models";
import { DetailClass } from "@core/classes";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
})
export class TeamProfileAdmin extends DetailClass<Team> implements OnInit {
  membersCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TASK_FIELDS;
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countMembers = (n: number) => (this.membersCount = n);

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
   * Add members to team
   */
  addMember() {
    const params = { team: this.resource.id };
    this.editManyToMany<User>("users", params);
  }
}
