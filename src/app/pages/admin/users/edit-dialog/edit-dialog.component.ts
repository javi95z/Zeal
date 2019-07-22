import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { UtilsService } from "../../../../services";

@Component({
  selector: "z-user-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditUserDialog implements OnInit {
  form: FormGroup;
  fieldsForm: any[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialog>,
    private utils: UtilsService,
    @Inject(MAT_DIALOG_DATA) public user: any[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    const fields = this.utils.processFieldKeys(this.user as User[]);
    // Populate the form
    fields.forEach(field => {
      let fc = new FormControl(field.value);
      this.form.addControl(field.name, fc);
      this.fieldsForm.push(field);
    });
  }
}
