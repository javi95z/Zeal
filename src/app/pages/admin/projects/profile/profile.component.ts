import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ApiService, DialogService } from "@services";
import { Project, User, PanelAction, Field, Tabs } from "@models";
import { PROJECT_FIELDS, PANEL_ACTIONS } from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProjectProfileAdmin implements OnInit {
  private _project: Project;
  isLoading = true;
  error: boolean;
  menu: PanelAction[];
  tabs = new Tabs();

  get project(): Project {
    return this._project;
  }
  set project(value: Project) {
    this._project = new Project(value);
  }

  constructor(
    private api: ApiService<any>,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      if (data.id) {
        this.api
          .getOne("projects", data.id)
          .then((res) => (this.project = res.data))
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
        this.router.navigate(["/admin", "projects"]);
        break;
      case "EDIT":
        this.editProject();
        break;
      case "DELETE":
        this.deleteProject();
        break;
    }
  }

  /**
   * Show dialog and return updated project
   * Send API request for modification
   */
  editProject() {
    this.dialog
      .editDialog<Project>({
        object: this.project,
        fields: PROJECT_FIELDS,
      })
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.api
            .updateOne("projects", result, this.project.id)
            .then((res) => (this.project = res.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  /**
   * Show confirm dialog
   * Send API request for deletion
   * @param p Project
   */
  deleteProject() {
    this.dialog.deleteDialog(this.project.name).subscribe((res) => {
      if (res) {
        this.api
          .deleteOne("projects", this.project.id)
          .then(() => this.location.back());
      }
    });
  }

  /**
   * Remove member from a project
   * @param user User to remove
   */
  removeMember(user: User) {
    const text = `Are you sure you want to remove ${user.fullName} from the project ${this.project.name}`;
    const users = pluckFields(this.project.users).filter((o) => o !== user.id);

    this.dialog.deleteDialog(null, text).subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.api
          .updateOne("projects", { users }, this.project.id)
          .then((o) => (this.project = o.data))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Add members to project
   */
  async addMember() {
    // Fetch users
    let availableUsers: User[];
    await this.api.getAll("users").then((o) => (availableUsers = o.data));

    // Filter out current members
    const users = pluckFields(this.project.users);
    const usersList = availableUsers.filter((o) => !users.includes(o.id));

    const membersField: Field = {
      key: "users",
      label: "Members",
      type: "multiple",
      options: pluckFields(usersList, ["first_name", "last_name"]),
    };
    this.dialog
      .editDialog<any>({ fields: [membersField] })
      .subscribe((result) => {
        if (result) {
          users.push(...result.users);
          this.isLoading = true;
          this.api
            .updateOne("projects", { users }, this.project.id)
            .then((o) => (this.project = o.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }
}
