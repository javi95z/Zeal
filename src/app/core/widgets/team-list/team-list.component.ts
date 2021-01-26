import { Component, Input, OnInit, Injector } from "@angular/core";
import { Team } from "@models";
import { DataWidgetClass } from "@core/classes/datawidget";
import { TEAM_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-team-list",
  templateUrl: "./team-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class TeamListWidget extends DataWidgetClass<Team> implements OnInit {
  @Input() users: number[];

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TEAM_FIELDS;
  }

  ngOnInit(): void {
    this.params = {
      limit: this.limit || null,
      user: this.users,
    };
    this.refreshData();
  }

  refreshData() {
    this.refresh = true;
    this.loadData().then((o) => (this.data = o));
  }

  createNew() {
    const body = { users: this.users };
    super.createNew(body);
  }
}
