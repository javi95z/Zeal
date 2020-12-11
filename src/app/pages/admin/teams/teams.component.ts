import { Component, OnInit, Injector } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Team } from "@models";

@Component({
  selector: "z-admin-teams",
  templateUrl: "./teams.component.html",
})
export class TeamsAdmin extends AdminListClass<Team> implements OnInit {
  columns: string[] = ["select", "name", "members", "actions"];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
  }

  ngOnInit() {
    this.initData();
  }

  onAction(action: string, team: Team, index: number) {
    switch (action) {
      case "EDIT":
        // this.editTeam(team, index);
        break;
      case "DELETE":
        this.deleteTeam(team, index);
        break;
    }
  }

  /**
   * Confirmation dialog
   * to remove team
   * @param t Team
   * @param i Index
   */
  private deleteTeam(t: Team, i: number) {
    this.dialog.deleteDialog(t.name).subscribe((res) => {
      if (res) super.deleteData(t.id, i);
    });
  }
}
