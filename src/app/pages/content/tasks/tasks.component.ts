import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Task, User } from "@models";
import { TASK_FIELDS } from "@zeal/variables";
import { TASKS_TEXTS } from "@zeal/dict";
import { pluckFields } from "@zeal/utils";

@Component({
  selector: "z-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent extends ListClass<Task> implements OnInit {
  @Input() project: number[];
  @Input() canCreate: boolean;
  @Input() canRefresh = true;
  currentUser: User;

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

  // Load data if not provided
  async ngOnInit() {
    await this.auth.currentUser.then((e) => (this.currentUser = e));
    this.loadData();
  }

  protected create() {
    const data = {
      project: this.project ? this.project : null,
    };
    super.createData(data).then((task) => {
      if (!task) return;
      this.suggestToSelfAssignTask().then((res) => {
        if (res) this.selfAssign(task.id);
      });
    });
  }

  protected loadData() {
    this.isLoading = true;
    this.initData(this.buildParams());
  }

  protected onAction(action: string, task: Task, index: number) {
    switch (action) {
      case "FAVORITE":
        this.toggleFavorite(task.id);
        break;
      case "EDIT":
        this.editData(task, task.id, index);
        break;
      case "DELETE":
        this.deleteData(task.id, index, task.name);
        break;
    }
  }

  protected selfAssign(id: number) {
    const obj = {
      user: this.currentUser.id,
    };
    this.api.updateOne(this.resourceName, obj, id).then((res) => {
      // ! Refresh to show Owner field correctly
      // this.dataSource.data[index] = res.data;
      // this.dataSource._updateChangeSubscription();
    });
  }

  private buildParams(): object {
    const userProjects = pluckFields(this.currentUser.projects);
    return {
      user: this.currentUser ? [this.currentUser.id] : null,
      project: this.project ? [this.project] : userProjects,
    };
  }

  // Suggest to self assign task to current user
  private async suggestToSelfAssignTask() {
    let response: boolean;
    await this.dialog
      .confirmDialog(TASKS_TEXTS.newTaskWithoutOwner)
      .toPromise()
      .then((o) => (response = !!o));
    return response;
  }
}
