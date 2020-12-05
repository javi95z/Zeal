import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService, DialogService } from "@services";
import { Task, PanelAction, Tabs } from "@models";
import { TASK_FIELDS, PANEL_ACTIONS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class TaskProfileAdmin implements OnInit {
  private _task: Task;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];
  tabs = new Tabs();

  get task(): Task {
    return this._task;
  }
  set task(value: Task) {
    this._task = new Task(value);
  }

  constructor(
    private api: ApiService<any>,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.api
          .getOne("tasks", data.id)
          .then((res) => (this.task = res.data))
          .catch(() => (this.error = true))
          .finally(() => {
            this.isLoading = false;
            this.menu = this.buildMenu();
          });
      }
    });
  }

  buildMenu(): PanelAction[] {
    const actions = ["EDIT", "LIST", "DELETE"];
    return PANEL_ACTIONS.filter((o) => actions.includes(o.action));
  }

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "tasks"]);
        break;
      case "EDIT":
        // this.editTask();
        break;
      case "DELETE":
        this.deleteTask();
        break;
    }
  }

  /**
   * Show confirm dialog
   * Send API request for deletion
   * @param p Project
   */
  deleteTask() {
    this.dialog.deleteDialog(this.task.name).subscribe((res) => {
      if (res) {
        this.api
          .deleteOne("tasks", this.task.id)
          .then(() => this.location.back());
      }
    });
  }
}
