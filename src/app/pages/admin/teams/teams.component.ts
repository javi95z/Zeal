import { Component, OnInit, Injector } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Team } from "@models";
import { TEAM_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-teams",
  templateUrl: "./teams.component.html",
})
export class TeamsAdmin extends AdminListClass<Team> implements OnInit {
  columns: string[] = ["select", "name", "members", "actions"];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TEAM_FIELDS;
  }

  ngOnInit() {
    this.initData();
  }

  onAction(action: string, team: Team, index: number) {
    switch (action) {
      case "EDIT":
        super.editDialog(team, team.id, index);
        break;
      case "DELETE":
        super.deleteDialog(team.id, index, team.name);
        break;
    }
  }
}
