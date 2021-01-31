import { Component, Input, OnInit, Injector } from "@angular/core";
import { User } from "@models";
import { DataWidgetClass } from "@core/classes";
import { USER_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class UserListWidget extends DataWidgetClass<User> implements OnInit {
  @Input() projects: number[];
  @Input() teams: number[];
  @Input() altTitle: string;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
  }

  ngOnInit(): void {
    this.params = {
      project: this.projects || null,
      team: this.teams || null
    };
    this.refreshData();
  }

  refreshData() {
    this.refresh = true;
    this.loadData().then((o) => (this.data = o));
  }
}
