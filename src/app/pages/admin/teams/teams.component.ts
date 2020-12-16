import { Component, OnInit, Injector, Input } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Team } from "@models";
import { TEAM_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-teams",
  templateUrl: "./teams.component.html",
})
export class TeamsAdmin extends AdminListClass<Team> implements OnInit {
  @Input() user?: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TEAM_FIELDS;
    this.columns = ["select", "name", "members", "actions"];
  }

  ngOnInit() {
    const body = {};
    if (this.user) body["user"] = this.user;
    this.initData(body);
  }

  onAction(action: string, team: Team, index: number) {
    switch (action) {
      case "EDIT":
        this.editData(team, team.id, index);
        break;
      case "DELETE":
        this.deleteData(team.id, index, team.name);
        break;
    }
  }
}
