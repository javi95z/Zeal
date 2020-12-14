import { Component, Input, OnInit } from "@angular/core";
import { Team } from "@models";
import { ApiService } from "@services";

@Component({
  selector: "z-team-list",
  templateUrl: "./team-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class TeamListWidget implements OnInit {
  @Input() user?: number;
  refresh = false;
  data: Team[];

  constructor(private api: ApiService<Team>) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.refresh = true;
    this.api
      .getAll("teams", { user: this.user })
      .then((o) => (this.data = o.data))
      .finally(() => (this.refresh = false));
  }
}
