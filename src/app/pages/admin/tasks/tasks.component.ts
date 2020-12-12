import { Component, OnInit, Input, Injector } from "@angular/core";
import { AdminListClass } from "@zeal/core/classes/adminlist";
import { Task } from "@models";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
})
export class TasksAdmin extends AdminListClass<Task> implements OnInit {
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
    const body = {};
    if (this.project) body["project"] = this.project;
    if (this.user) body["user"] = this.user;
    this.initData(body);
  }

  onAction(action: string, task: Task, index: number) {
    switch (action) {
      case "EDIT":
        super.editDialog(task, task.id, index);
        break;
      case "DELETE":
        super.deleteDialog(task.id, index, task.name);
        break;
    }
  }

  createTask() {
    const data = {};
    if (this.project) data["project"] = this.project;
    if (this.user) data["user"] = this.user;
    this.createDialog(data);
  }
}
