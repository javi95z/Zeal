import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService, DialogService, UserService } from "@services";
import { Project, User } from "@models";
import {
  PanelAction,
  Field,
  PROJECT_FIELDS,
  PANEL_ACTIONS
} from "@zeal/variables";
import { pluckFields } from "@zeal/utils";

@Component({
  selector: "z-admin-project-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProjectProfileAdminComponent implements OnInit {
  private _project: Project;
  isLoading = true;
  menu: PanelAction[];
  availableUsers: User[] = [];

  get project(): Project {
    return this._project;
  }
  set project(value: Project) {
    this._project = new Project(value);
  }

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private user: UserService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getProject(data.id)
          .then(res => (this.project = res.data))
          .finally(() => {
            this.isLoading = false;
            this.menu = this.buildMenu();
          });
      }
    });
  }

  buildMenu(): PanelAction[] {
    const actions = ["EDIT", "LIST"];
    return PANEL_ACTIONS.filter(o => actions.includes(o.action));
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
        fields: PROJECT_FIELDS
      })
      .subscribe(result => {
        if (result) {
          this.isLoading = true;
          this.service
            .updateProject(result)
            .then(res => (this.project = res))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  /**
   * Remove members from project
   * @param ids User ids
   */
  removeMember(users: User[]) {
    const names = users.length > 1 ? "selected users" : users[0].fullName;
    const text = `Are you sure you want to remove ${names} from the project ${this.project.name}`;
    this.dialog.deleteDialog(null, text).subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.service
          .removeMember(this.project.id, pluckFields(users))
          .then(o => (this.project = o.data))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Add members to project
   */
  async addMember() {
    // Fetch users
    await this.user
      .getUsers()
      .then(o => o.data.filter(u => this.availableUsers.push(new User(u))));

    // Filter out current members
    const members = pluckFields(this.project.users);
    const usersList = this.availableUsers.filter(o => !members.includes(o.id));

    const membersField: Field = {
      key: "users",
      label: "Members",
      type: "multiple",
      options: pluckFields(usersList, "fullName")
    };
    this.dialog
      .editDialog<any>({ fields: [membersField] })
      .subscribe(result => {
        if (result) {
          this.isLoading = true;
          this.service
            .addMember(this.project.id, result.users)
            .then(o => (this.project = o.data))
            .finally(() => (this.isLoading = false));
        }
      });
  }
}
