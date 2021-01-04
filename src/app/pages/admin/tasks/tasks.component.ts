import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@zeal/core/classes/list";
import { Task } from "@models";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
})
export class TasksAdmin extends ListClass<Task> implements OnInit {
  @Input() project?: number;
  @Input() user?: number;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
    this.fields = TASK_FIELDS;
    this.columns = [
      "select",
      "name",
      "project",
      "priority",
      "owner",
      "status",
      "start_date",
      "end_date",
      "actions",
    ];
  }

  ngOnInit(): void {
    const body = {
      project: this.project ? [this.project] : null,
      user: this.user ? [this.user] : null,
    };
    this.initData(body);
  }

  protected createTask() {
    const data = {};
    if (this.project) data["project"] = this.project;
    if (this.user) data["user"] = this.user;
    this.createDialog(data);
  }
}
