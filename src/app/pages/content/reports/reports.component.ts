import { Component, OnInit, Injector, Input } from "@angular/core";
import { ListClass } from "@core/classes";
import { Report } from "@models/report";

@Component({
  selector: "z-reports",
  templateUrl: "./reports.component.html",
  styles: [
    `
      td:first-child {
        width: 220px;
      }
    `,
  ],
})
export class ReportsComponent extends ListClass<Report> implements OnInit {
  @Input() task: number;
  canCreate = true;
  canRefresh = true;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "reports";
    // this.fields = PROJECT_FIELDS;
    this.columns = ["user", "invested_hours", "comment", "date", "actions"];
  }

  ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.isLoading = true;
    this.api
      .getCustom("tasks", this.task, "reports")
      .then((o: Report[]) => {
        this.renderView(o);
        console.log(o);
      })
      .finally(() => (this.isLoading = false));
  }
}
