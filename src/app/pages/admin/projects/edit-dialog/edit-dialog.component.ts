import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Project } from "@models";
import { ProjectService } from "@zeal/services";
import { populateFormFields } from "@zeal/utils";
import { PROJECT_PRIORITY, PROJECT_STATUS } from "@zeal/variables";

@Component({
  selector: "z-project-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditProjectDialog implements OnInit {
  priorityList = PROJECT_PRIORITY;
  statusList = PROJECT_STATUS;
  isLoading = true;
  result: Project;
  form = new FormGroup({
    code: new FormControl("", Validators.maxLength(6)),
    name: new FormControl("", Validators.required),
    description: new FormControl(),
    priority: new FormControl(),
    status: new FormControl("", Validators.required),
    start_date: new FormControl(),
    end_date: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProjectDialog>,
    private project: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    Promise.all([this.getProject(this.data)]).finally(() => {
      this.form = populateFormFields(this.result, this.form);
      this.isLoading = false;
    });
  }

  /**
   * Get project and return
   * true when finished
   */
  private async getProject(id: number): Promise<true> {
    await this.project
      .getProject(id)
      .then(res => (this.result = res.data))
      .catch(err => console.error(err));
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = Object.assign(this.result, this.form.value);
    const project = new Project(updated);
    // project.role = this.availableRoles.find(o => o.id === updated.role);
    // project.teams = this.availableTeams.filter(o => updated.teams.includes(o.id));
    this.dialogRef.close(project);
  }
}
