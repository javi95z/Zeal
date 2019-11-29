import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService, TeamService, UserService } from "@services";
import { User, Role, Team } from "@models";
import { populateFormFields } from "@zeal/utils";

@Component({
  selector: "z-user-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditUserDialog implements OnInit {
  isLoading = true;
  roleList: Role[];
  teamList: Team[];
  result: User;
  form = new FormGroup({
    active: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    first_name: new FormControl("", Validators.maxLength(50)),
    gender: new FormControl(),
    last_name: new FormControl("", Validators.maxLength(50)),
    role: new FormControl(),
    suffix: new FormControl("", Validators.maxLength(10)),
    teams: new FormControl()
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialog>,
    private user: UserService,
    private role: RoleService,
    private team: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.getRoles(),
      this.getTeams(),
      this.getUser(this.data)
    ]).finally(() => {
      this.form = populateFormFields(this.result, this.form);
      this.isLoading = false;
    });
  }

  /**
   * Get user and return
   * true when finished
   */
  private async getUser(id: number): Promise<true> {
    await this.user
      .getUser(id)
      .then(res => (this.result = res.data))
      .catch(err => console.error(err));
    return true;
  }

  /**
   * Get roles list and return
   * true when finished
   */
  private async getRoles(): Promise<true> {
    await this.role
      .getRoles()
      .then(res => (this.roleList = res.data))
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
      .then(res => (this.teamList = res.data))
      .catch(err => console.error(err));
    return true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = Object.assign(this.result, this.form.value);
    const user = new User(updated);
    user.role = this.roleList.find(o => o.id === updated.role);
    user.teams = this.teamList.filter(o => updated.teams.includes(o.id));
    this.dialogRef.close(user);
  }
}
