import { Component, OnInit, Input } from "@angular/core";
import { AdminListClass } from "@zeal/core/classes/adminlist";
import { Task } from "@models";
import { ApiService, DialogService } from "@services";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksAdmin extends AdminListClass<Task> implements OnInit {
  @Input() project_id?: number;
  tasks: Task[];
  displayedColumns: string[] = [
    "select",
    "name",
    "priority",
    "status",
    "start_date",
    "end_date",
    "actions",
  ];

  constructor(private api: ApiService<Task>) {
    super();
  }

  ngOnInit(): void {
    const body = this.project_id ? { project: this.project_id } : null;
    this.initData(this.api.getAll("tasks", body));
  }
}
