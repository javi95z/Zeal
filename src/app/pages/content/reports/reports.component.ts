import { Component, OnInit, Injector, Input } from "@angular/core";
import { ListClass } from "@core/classes";
import { Report } from "@models/report";
import { REPORT_FIELDS } from "@zeal/variables";

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
    this.fields = REPORT_FIELDS;
    this.columns = ["user", "invested_hours", "comment", "date", "actions"];
  }

  ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.isLoading = true;
    this.api
      .getCustom("tasks", this.task, "reports")
      .then((o: Report[]) => this.renderView(o))
      .finally(() => (this.isLoading = false));
  }

  protected create() {
    const data = { task_id: this.task ? this.task : null };
    super.createData(data).then(() => {
      this.sortData({ active: "date", direction: "desc" });
    });
  }
}
