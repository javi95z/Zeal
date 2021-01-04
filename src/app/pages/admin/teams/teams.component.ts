import { Component, OnInit, Injector, Input } from "@angular/core";
import { ListClass } from "@core/classes";
import { Team } from "@models";
import { TEAM_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-teams",
  templateUrl: "./teams.component.html",
})
export class TeamsAdmin extends ListClass<Team> implements OnInit {
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
}
