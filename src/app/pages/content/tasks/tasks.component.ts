import { Component, OnInit, Input, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Task, User } from "@models";
import { TASK_FIELDS } from "@zeal/variables";
import { TASKS_TEXTS } from "@zeal/dict";
import { pluckFields, getColor } from "@zeal/utils";

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
  statusWidget: any;
  priorityWidget: any;

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

  protected loadData() {
    this.isLoading = true;
    this.initData(this.buildParams()).finally(() => {
      this.buildStatusWidget();
      this.buildPriorityWidget();
    });
  }

  protected create() {
    const data = {
      project: this.project ? this.project : null,
    };
    super.createData(data).then((res) => {
      if (!res) return;
      this.suggestToSelfAssignTask().then((o) => {
        if (o) this.selfAssign(res.data.id, res.index);
      });
    });
  }

  protected selfAssign(id: number, index: number) {
    const obj = {
      user: this.currentUser.id,
    };
    this.api.updateOne(this.resourceName, obj, id).then((res) => {
      this.editDataTable(res.data, index);
    });
  }

  // Build parameters to fetch data from API
  private buildParams(): object {
    const userProjects = pluckFields(this.currentUser.projects);
    return {
      user: this.currentUser && !this.project ? [this.currentUser.id] : null,
      project: this.project ? [this.project] : userProjects,
      with: !this.project ? ["stats"] : null,
    };
  }

  // Build data to populate status widget
  protected buildStatusWidget() {
    if (!this.stats) return;
    this.stats["status"].map((o) => (o.color = getColor(o.name)));
    this.statusWidget = {
      title: "Status of tasks",
      resource: this.resourceName,
      labels: this.stats["status"],
    };
  }

  // Build data to populate priority widget
  protected buildPriorityWidget() {
    if (!this.stats) return;
    this.stats["priority"].map((o) => (o.color = getColor(o.name)));
    this.priorityWidget = {
      title: "Priority of tasks",
      resource: this.resourceName,
      labels: this.stats["priority"],
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
