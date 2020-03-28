import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Field } from "@models";
import { populateFormFields, formatDate } from "@zeal/utils";
import { VALIDATION_ERRORS } from "@zeal/dict";

@Component({
  selector: "z-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditDialogComponent<T> implements OnInit {
  form: FormGroup;
  errorMessages = VALIDATION_ERRORS;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: { object: T; fields: Field[]; relationships: string[] }
  ) {}

  ngOnInit(): void {
    this.form = this.buildAndPopulateForm(this.data.fields);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = this.data.object
      ? Object.assign(this.data.object, this.form.value)
      : this.form.value;

    // Transform dates to be sent to API
    this.data.fields.forEach(e =>
      e.type === "date" ? (updated[e.key] = formatDate(updated[e.key])) : null
    );
    const result = updated as T;
    this.dialogRef.close(result);
  }

  showErrors() {
    console.log(this.form);
  }

  private buildAndPopulateForm(fields: Field[]): FormGroup {
    const group: any = {};
    fields.forEach(f => {
      group[f.key] = new FormControl();
      group[f.key].setValidators(f.validators);
      group[f.key].updateValueAndValidity();
    });
    const fg = new FormGroup(group);
    if (this.data.object) {
      return populateFormFields(this.data.object, fg);
    }
    return fg;
  }
}
