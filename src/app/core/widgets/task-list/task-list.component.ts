import { Component, Input, OnInit, Injector } from "@angular/core";
import { Task } from "@models";
import { DataWidgetClass } from "@core/classes/datawidget";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class TaskListWidget extends DataWidgetClass<Task> implements OnInit {
  @Input() user?: number;
  @Input() project?: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
    this.fields = TASK_FIELDS;
  }

  ngOnInit(): void {
    this.params = {
      limit: this.limit || null,
      user: this.user ? [this.user] : null,
      project: this.project ? [this.project] : null,
    };
    this.refreshData();
  }

  refreshData() {
    this.refresh = true;
    this.loadData().then((o) => (this.data = o));
  }
}
