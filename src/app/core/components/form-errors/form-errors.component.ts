import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { VALIDATION_ERRORS } from "@zeal/dict";

class ErrorMessage {
  field: string;
  message: string;
  constructor(values: ErrorMessage) {
    Object.assign(this, values);
  }
}

@Component({
  selector: "z-form-errors",
  templateUrl: "./form-errors.component.html",
  styleUrls: ["./form-errors.component.scss"]
})
export class FormErrorsComponent implements OnInit {
  @Input() form: FormGroup;
  errors: ErrorMessage[];

  constructor() {}

  ngOnInit() {
    this.form.valueChanges.subscribe(
      () => (this.errors = this.validateErrors(this.form))
    );
  }

  private validateErrors(form: FormGroup): ErrorMessage[] {
    const result: ErrorMessage[] = [];
    Object.keys(form.controls).forEach(key => {
      const ctrlErrors: ValidationErrors = form.get(key).errors;
      if (ctrlErrors != null) {
        Object.keys(ctrlErrors).forEach(err =>
          result.push({
            field: key,
            message: VALIDATION_ERRORS[err]
          })
        );
      }
    });
    return result;
  }
}
