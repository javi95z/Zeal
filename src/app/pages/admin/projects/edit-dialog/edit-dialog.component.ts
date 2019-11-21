import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { Project } from "@models";
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
    code: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    priority: new FormControl(),
    status: new FormControl(),
    start_date: new FormControl(),
    end_date: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public project: Project
  ) {}

  ngOnInit(): void {
    this.result = this.project;
    this.form = populateFormFields(this.project, this.form);
    this.isLoading = false;
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
