import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { EditProjectDialog } from "@pages/admin/projects/edit-dialog/edit-dialog.component";
import { ProjectService } from "@services";
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
    private dialog: MatDialog
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

  editProjectDialog(projectId: number) {
    const dialogRef = this.dialog.open(EditProjectDialog, {
      panelClass: "modal-dialog-box",
      data: projectId
    });

    dialogRef.afterClosed().subscribe((result: Project) => {
      // if (result) this.updateProject(result);
    });
  }
}
