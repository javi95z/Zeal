import { FormGroup } from "@angular/forms";

/**
 * Populate the form values from a model
 * @param model Object containing the model
 * @param form FormGroup to populate
 */
export const populateFormFields = (model: any, form: FormGroup): FormGroup => {
  Object.keys(form.controls).map(i => {
    form.controls[i].setValue(
      typeof model[i] !== "object" ? model[i] : model[i].id
    );
  });
  return form;
};
