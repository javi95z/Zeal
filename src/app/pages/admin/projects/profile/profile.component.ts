import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService, DialogService } from "@services";
import { Project } from "@models";
import { PanelAction, PROJECT_FIELDS, PANEL_ACTIONS } from "@zeal/variables";

@Component({
  selector: "z-admin-project-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProjectProfileAdminComponent implements OnInit {
  project: Project;
  isLoading = true;
  menu: PanelAction[];

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getProject(data.id)
          .then(res => (this.project = new Project(res.data)))
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
            .catch(err => console.error(err))
            .finally(() => (this.isLoading = false));
        }
      });
  }

  removeMember(id: number) {
    // TODO
    console.log("Remove user", id, "from project");
  }
}
