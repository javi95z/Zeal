import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { RoleService } from "../../../../services";
import { User, Role } from "../../../../models";
import { populateFormFields } from "../../../../utils";

@Component({
  selector: "z-user-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditUserDialog implements OnInit {
  availableRoles: Role[];
  form = new FormGroup({
    active: new FormControl(),
    email: new FormControl(),
    first_name: new FormControl(),
    gender: new FormControl(),
    last_name: new FormControl(),
    role: new FormControl(),
    suffix: new FormControl(),
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialog>,
    private role: RoleService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.form = populateFormFields(this.user, this.form);
  }

  private getRoles(): void {
    this.role
      .getRoles()
      .then((data: Role[]) => (this.availableRoles = data))
      .catch(err => console.error(err));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = Object.assign(this.user, this.form.value);
    this.dialogRef.close(updated);
  }
}
