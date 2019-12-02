import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService, DialogService } from "@services";
import { Project } from "@models";
import { PROJECT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-project-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProjectProfileAdminComponent implements OnInit {
  project: Project;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getProject(data.id)
          .then(res => (this.project = new Project(res.data)))
          .finally(() => (this.isLoading = false));
      }
    });
  }

  /**
   * Show dialog and return updated project
   * Send API request for modification
   * @param projectId Id
   */
  editProject(project: Project) {
    this.dialog
      .editDialog<Project>({
        object: project,
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
}
