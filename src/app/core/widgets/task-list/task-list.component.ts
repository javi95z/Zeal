import { Component, Input, OnInit } from "@angular/core";
import { Task } from "@models";
import { ApiService } from "@services";

@Component({
  selector: "z-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["../widgets.scss"],
})
export class TaskListWidget implements OnInit {
  @Input() user?: number;
  refresh = false;
  data: Task[];

  constructor(private api: ApiService<Task>) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.refresh = true;
    this.api
      .getAll("tasks", { user: this.user })
      .then((o) => (this.data = o.data))
      .finally(() => (this.refresh = false));
  }
}
