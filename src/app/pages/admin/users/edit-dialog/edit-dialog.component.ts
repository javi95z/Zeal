import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { RoleService, TeamService } from "../../../../services";
import { User, Role, Team } from "../../../../models";
import { populateFormFields } from "../../../../utils";

@Component({
  selector: "z-user-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditUserDialog implements OnInit {
  isLoading = true;
  availableRoles: Role[];
  availableTeams: Team[];
  form = new FormGroup({
    active: new FormControl(),
    email: new FormControl(),
    first_name: new FormControl(),
    gender: new FormControl(),
    last_name: new FormControl(),
    role: new FormControl(),
    suffix: new FormControl(),
    teams: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialog>,
    private role: RoleService,
    private team: TeamService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit(): void {
    Promise.all([this.getRoles(), this.getTeams()]).finally(() => {
      this.form = populateFormFields(this.user, this.form);
      this.isLoading = false;
    });
  }

  /**
   * Get roles list and return
   * true when finished
   */
  private async getRoles(): Promise<true> {
    await this.role
      .getRoles()
      .then((data: Role[]) => (this.availableRoles = data))
      .catch(err => console.error(err));
    return true;
  }

  /**
   * Get teams list and return
   * true when finished
   */
  private async getTeams(): Promise<true> {
    await this.team
      .getTeams()
      .then((data: Team[]) => (this.availableTeams = data))
      .catch(err => console.error(err));
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = Object.assign(this.user, this.form.value);
    updated.role = this.availableRoles.find(r => r.id === updated.role);
    this.dialogRef.close(updated);
  }
}
