import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "../../../../services";
import {User} from "../../../../models";

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
  ) {
  }

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
      const fc = new FormControl(field.value);
      this.form.addControl(field.name, fc);
      this.fieldsForm.push(field);
    });
  }
}
