import { Component, OnInit, Injector } from "@angular/core";
import { Team, User } from "@models";
import { AdminSingleClass } from "@core/classes/adminsingle";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class TeamProfileAdmin extends AdminSingleClass<Team> implements OnInit {
  membersCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
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
        this.editResource(TASK_FIELDS);
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
    this.editManyToMany<User>("users", this.resource?.users);
  }
}
