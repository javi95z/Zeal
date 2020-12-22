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
  @Input() project: number;
  @Input() altTitle: string;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "users";
    this.fields = USER_FIELDS;
  }

  ngOnInit(): void {
    if (this.project) this.params = { project: this.project };
    this.refreshData();
  }

  refreshData() {
    this.refresh = true;
    this.loadData().then((o) => {
      this.countValues.emit(o.length);
      this.data = o;
    });
  }
}
