import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Task } from "@models";
import { TASK_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent extends ListClass<Task> implements OnInit {
  @Input() project: number;
  @Input() canCreate: boolean;
  @Input() canRefresh: boolean;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
    this.fields = TASK_FIELDS;
    this.columns = [
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
    this.loadData();
  }

  protected create() {
    const data = {};
    if (this.project) data["project"] = this.project;
    super.createData(data);
  }

  protected loadData() {
    this.isLoading = true;
    const body = {};
    if (this.project) body["project"] = this.project;
    this.initData(body);
  }

  protected onAction(action: string, task: Task, index: number) {
    switch (action) {
      case "EDIT":
        this.editData(task, task.id, index);
        break;
      case "DELETE":
        this.deleteData(task.id, index, task.name);
        break;
    }
  }
}
