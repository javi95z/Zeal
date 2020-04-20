import { Component, OnInit, Input } from "@angular/core";
import { AdminListClass } from "@core/classes/adminlist";
import { Task } from "@models";
import { DialogService, TaskService } from "@services";

@Component({
  selector: "z-admin-tasks",
  templateUrl: "./tasks.component.html",
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

  constructor(private service: TaskService, private dialog: DialogService) {
    super();
  }

  ngOnInit(): void {
    this.renderView(this.values);
  }

  onAction(action: string, task: Task, index: number): void {
    switch (action) {
      case "DELETE":
        this.deleteTask(task, index);
        break;
    }
  }

  /**
   * Confirmation dialog
   * to remove task
   * @param p Task
   * @param i Index
   */
  private deleteTask(p: Task, i: number) {
    const task = new Task(p);
    this.dialog.deleteDialog(task.name).subscribe((res) => {
      if (res) {
        this.deleteData(this.service.deleteTask(task), i);
      }
    });
  }
}
