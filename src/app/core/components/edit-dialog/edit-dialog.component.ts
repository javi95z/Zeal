import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { Field } from "@zeal/variables";
import { populateFormFields } from "@zeal/utils";

@Component({
  selector: "z-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.scss"]
})
export class EditDialogComponent<T> implements OnInit {
  isLoading = true;
  form: FormGroup;

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
    const result = updated as T;
    this.dialogRef.close(result);
  }

  private buildAndPopulateForm(fields: Field[]): FormGroup {
    const group: any = {};
    fields.forEach(f => (group[f.key] = new FormControl()));
    const fg = new FormGroup(group);
    if (this.data.object) {
      return populateFormFields(this.data.object, fg);
    }
    return fg;
  }
}
