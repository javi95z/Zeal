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
  columns: string[] = [
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

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
    this.fields = TASK_FIELDS;
  }

  ngOnInit(): void {
    if (this.hideCols)
      this.columns = this.columns.filter((o) => !this.hideCols.includes(o));
    const body = this.project ? { project: this.project } : null;
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
    this.createDialog(data);
  }
}
