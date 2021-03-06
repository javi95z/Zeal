import {
  Component,
  OnInit,
  Input,
  Injector,
  Output,
  EventEmitter,
} from "@angular/core";
import { ListClass } from "@core/classes";
import { Task, User, Field } from "@models";
import { TASK_FIELDS } from "@zeal/variables";
import { TASKS_TEXTS } from "@zeal/dict";
import { pluckFields, getColor } from "@zeal/utils";

@Component({
  selector: "z-tasks",
  templateUrl: "./tasks.component.html",
})
export class TasksComponent extends ListClass<Task> implements OnInit {
  @Input() project: number[];
  @Input() canCreate = true;
  @Input() canRefresh = true;
  @Input() canAssign = false;
  @Output() hoursManagement = new EventEmitter<HoursManagement>();
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
      "estimated_hours",
      "status",
      "start_date",
      "end_date",
      "actions",
    ];
  }

  ngOnInit() {
    this.auth.user$.subscribe((e) => {
      this.currentUser = e;
      this.loadData();
    });
  }

  protected loadData() {
    this.isLoading = true;
    this.initData(this.buildParams()).finally(() => {
      this.buildStatusWidget();
      this.buildPriorityWidget();
      this.countHours();
    });
  }

  protected create() {
    const data = {
      project: this.project ? this.project : null,
    };
    super.createData(data).then((res) => {
      if (_.isEmpty(res.data)) return;
      this.suggestToSelfAssignTask().then((o) => {
        if (o) this.selfAssign(res.data.id, res.index);
      });
    });
  }

  protected selfAssign(id: number, index: number) {
    const obj = { user: this.currentUser.id };
    this.api.updateOne(this.resourceName, obj, id).then((res) => {
      this.editDataTable(res.data, index);
    });
  }

  protected async assignTask(id: number, index: number) {
    // Fetch all resources
    let list: User[];
    await this.api
      .getAll("users", { project: [this.project] })
      .then((o) => (list = o.data));

    const field: Field = {
      key: "user",
      label: "Task owner",
      type: "select",
      options: pluckFields(list, ["name"]),
    };

    this.dialog
      .editDialog<any>({ fields: [field] })
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.api
            .updateOne(this.resourceName, result, id)
            .then((o) => this.editDataTable(o.data, index))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  // Build parameters to fetch data from API
  private buildParams(): object {
    const userProjects = pluckFields(this.currentUser.projects);
    return {
      user: this.currentUser && !this.project ? [this.currentUser.id] : null,
      project: this.project ? [this.project] : userProjects,
      with: !this.project ? ["stats"] : ["times"],
    };
  }

  // Build data to populate status widget
  protected buildStatusWidget() {
    if (!this.meta["stats"]) return;
    this.meta["stats"]["status"].map((o) => (o.color = getColor(o.name)));
    this.statusWidget = {
      title: "Status of tasks",
      resource: this.resourceName,
      labels: this.meta["stats"]["status"],
    };
  }

  // Build data to populate priority widget
  protected buildPriorityWidget() {
    if (!this.meta["stats"]) return;
    this.meta["stats"]["priority"].map((o) => (o.color = getColor(o.name)));
    this.priorityWidget = {
      title: "Priority of tasks",
      resource: this.resourceName,
      labels: this.meta["stats"]["priority"],
    };
  }

  protected countHours() {
    if (_.isEmpty(this.meta["times"])) return;
    const res: HoursManagement = {
      invested_hours: this.meta["times"]["invested_hours"],
      estimated_hours: this.meta["times"]["estimated_hours"],
    };
    this.hoursManagement.next(res);
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

export interface HoursManagement {
  estimated_hours: number;
  invested_hours: number;
}
