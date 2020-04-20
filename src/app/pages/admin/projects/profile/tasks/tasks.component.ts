import { Component, OnInit, Input } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Task } from "@models";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent extends AdminListClass<Task> implements OnInit {
  @Input() values: Task[];
  displayedColumns: string[] = [
    "select",
    "name",
    "priority",
    "status",
    "start_date",
    "end_date",
    "actions",
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.renderView(this.values);
  }

  onAction(): void {}
}
