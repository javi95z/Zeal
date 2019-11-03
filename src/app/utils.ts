import { FormGroup } from "@angular/forms";

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
