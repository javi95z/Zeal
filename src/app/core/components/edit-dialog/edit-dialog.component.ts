import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Field } from "@models";
import { populateFormFields, formatDate } from "@zeal/utils";
import { VALIDATION_ERRORS } from "@zeal/dict";

@Component({
  selector: "z-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"],
})
export class EditDialogComponent<T> implements OnInit {
  form: FormGroup;
  errorMessages = VALIDATION_ERRORS;
  titleForm: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fields: Field[]; object?: T; nameResource: string }
  ) {}

  ngOnInit(): void {
    this.titleForm = this.data.object ? "Edit" : "Create";
    this.titleForm += " " + this.data.nameResource.slice(0, -1);
    this.form = this.buildAndPopulateForm(this.data.fields);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updated = this.getChangedProperties();

    // Transform dates to be sent to API
    this.data.fields.forEach((e) =>
      e.type === "date" ? (updated[e.key] = formatDate(updated[e.key])) : null
    );
    const result = updated as T;
    this.dialogRef.close(result);
  }

  private buildAndPopulateForm(fields: Field[]): FormGroup {
    const group: any = {};
    fields.forEach((f) => {
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

  /**
   * Get the values of the fields that were updated
   */
  private getChangedProperties(): Object {
    const changedProps = {};
    Object.keys(this.form.controls).forEach((name) => {
      const current = this.form.controls[name];
      if (!current.pristine) {
        changedProps[name] = current.value;
      }
    });
    return changedProps;
  }
}
