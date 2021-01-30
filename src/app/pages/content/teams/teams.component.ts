import { Component, OnInit, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Team, User } from "@models";
import { TEAM_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-teams",
  templateUrl: "./teams.component.html",
})
export class TeamsComponent extends ListClass<Team> implements OnInit {
  currentUser: User;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TEAM_FIELDS;
    this.columns = ["name", "members", "actions"];
  }

  ngOnInit() {
    this.auth.user$.subscribe((e) => {
      this.currentUser = e;
      this.loadData();
    });
  }

  protected loadData() {
    this.isLoading = true;
    this.initData(this.buildParams());
  }

  // Build parameters to fetch data from API
  private buildParams() {
    return { user: this.currentUser ? [this.currentUser.id] : null };
  }
}
