import { FormGroup, ValidationErrors } from "@angular/forms";
import { VALIDATION_ERRORS } from "./dict";

/**
 * Populate the form values from a model
 * @param model Object containing the model
 * @param form FormGroup to populate
 */
export const populateFormFields = (model: any, form: FormGroup): FormGroup => {
  Object.keys(form.controls).map(i => {
    if (model[i] instanceof Array) {
      form.controls[i].setValue(model[i].map(e => e.id));
    } else if (model[i] instanceof Object) {
      form.controls[i].setValue(model[i].id);
    } else {
      form.controls[i].setValue(model[i]);
    }
  });
  return form;
};

export const parseRelationships = (model: any) => {
  Object.keys(model).map(i => {
    if (model[i] instanceof Array) {
      model[i] = model[i].map(e => e.id);
    } else if (model[i] instanceof Object) {
      model[i] = model[i]["id"];
    }
  });
  return model;
};

export const formValidationErrors = (form: FormGroup): string[] => {
  const result = [];
  Object.keys(form.controls).forEach(key => {
    const ctrlErrors: ValidationErrors = form.get(key).errors;
    if (ctrlErrors != null) {
      Object.keys(ctrlErrors).forEach(err =>
        result.push(`${key}: ${VALIDATION_ERRORS[err]}`)
      );
    }
  });
  return result;
};
