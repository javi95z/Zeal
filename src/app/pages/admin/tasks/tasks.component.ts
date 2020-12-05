import { Component, OnInit, Input } from "@angular/core";
import { AdminListClass } from "@zeal/core/classes/adminlist";
import { Task } from "@models";
import { ApiService, DialogService } from "@services";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
})
export class TasksAdmin extends AdminListClass<Task> implements OnInit {
  @Input() project_id?: number;
  columns: string[] = [
    "select",
    "name",
    "project",
    "status",
    "start_date",
    "end_date",
    "actions",
  ];

  constructor(private api: ApiService<Task>, private dialog: DialogService) {
    super();
  }

  ngOnInit(): void {
    if (this.hideCols)
      this.columns = this.columns.filter((o) => !this.hideCols.includes(o));
    const body = this.project_id ? { project: this.project_id } : null;
    this.initData(this.api.getAll("tasks", body));
  }
}
