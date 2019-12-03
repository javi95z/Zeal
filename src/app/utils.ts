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

/**
 * Pluck Id field and label field from array
 * In order to populate select fields
 * @param array Whole array of objects
 * @param label Name of the label field
 */
export const pluckFields = (array: any[], label?: string) => {
  return array.map(item => {
    if (label) {
      return { key: item["id"], label: item[label] };
    } else {
      return item.id;
    }
  });
};
