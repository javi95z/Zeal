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
    const updated = Object.assign(this.data.object, this.form.value);
    const result = updated as T;
    // TODO: Relationships
    this.dialogRef.close(result);
  }

  private buildAndPopulateForm(fields: Field[]): FormGroup {
    const group: any = {};
    fields.forEach(f => (group[f.key] = new FormControl()));
    const fg = new FormGroup(group);
    return populateFormFields(this.data.object, fg);
  }
}
