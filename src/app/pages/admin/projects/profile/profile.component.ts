import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EditProjectDialog } from "@pages/admin/projects/edit-dialog/edit-dialog.component";
import { ProjectService, DialogService, ToastService } from "@services";
import { Project } from "@models";

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
    private toast: ToastService,
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
  editProject(projectId: number) {
    this.dialog
      .editDialog<Project>(projectId, EditProjectDialog)
      .subscribe(project => {
        if (project) {
          this.isLoading = true;
          this.service
            .updateProject(project)
            .then(res => {
              this.project = new Project(res);
              this.toast.setMessage(
                `Project ${project.name} updated successfully.`
              );
            })
            .catch(err => console.error(err))
            .finally(() => (this.isLoading = false));
        }
      });
  }
}
