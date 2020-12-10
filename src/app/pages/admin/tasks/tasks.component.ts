import { Component, OnInit, Input, Injector } from "@angular/core";
import { AdminListClass } from "@zeal/core/classes/adminlist";
import { Task } from "@models";
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

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
  }

  ngOnInit(): void {
    if (this.hideCols)
      this.columns = this.columns.filter((o) => !this.hideCols.includes(o));
    const body = this.project_id ? { project: this.project_id } : null;
    this.initData(body);
  }

  onAction(action: string, task: Task, index: number) {
    switch (action) {
      case "EDIT":
        // this.editTask(user, index);
        break;
      case "DELETE":
        this.deleteTask(task, index);
        break;
    }
  }

  createTask() {
    this.dialog
      .editDialog<Task>({
        object: null,
        fields: TASK_FIELDS,
      })
      .subscribe((o: Task) => {
        if (o) {
          if (this.project_id) o.project = this.project_id;
          super.createData(o);
        }
      });
  }

  /**
   * Confirmation dialog
   * to remove task
   * @param t Task
   * @param i Index
   */
  private deleteTask(t: Task, i: number) {
    this.dialog.deleteDialog(t.name).subscribe((res) => {
      if (res) super.deleteData(t.id, i);
    });
  }
}
