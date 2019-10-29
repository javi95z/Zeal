import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "../../../../models";

@Component({
  selector: "z-user-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditUserDialog implements OnInit {
  form = new FormGroup({
    active: new FormControl(),
    email: new FormControl(),
    first_name: new FormControl(),
    gender: new FormControl(),
    last_name: new FormControl(),
    suffix: new FormControl(),
  });

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(this.user[key]);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = Object.assign(this.user, this.form.value);
    this.dialogRef.close(updated);
  }
}
