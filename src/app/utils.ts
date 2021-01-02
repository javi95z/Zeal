import { FormGroup } from "@angular/forms";
import { COLORS } from './variables';

/**
 * Populate the form values from a model
 * @param model Object containing the model
 * @param form FormGroup to populate
 */
export const populateFormFields = (model: any, form: FormGroup): FormGroup => {
  Object.keys(form.controls).map((i) => {
    if (model[i] instanceof Array) {
      form.controls[i].setValue(model[i].map((e) => e.id));
    } else if (model[i] instanceof Object) {
      form.controls[i].setValue(model[i].id);
    } else {
      form.controls[i].setValue(model[i]);
    }
  });
  return form;
};

export const parseRelationships = (model: any) => {
  Object.keys(model).map((i) => {
    if (model[i] instanceof Array) {
      model[i] = model[i].map((e) => e.id);
    } else if (model[i] instanceof Object) {
      model[i] = model[i]["id"];
    }
  });
  return model;
};

/**
 * Format date to string yyyy-mm-dd format
 * @param raw Date in JS format
 */
export const formatDate = (raw): string => {
  if (raw instanceof Date) {
    const result = raw
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//gi, "-");
    return result;
  }
  return raw;
};

/**
 * Pluck Id field and label field from array
 * In order to populate select fields
 * @param array Whole array of objects
 * @param label Name of the label field
 */
export const pluckFields = (array: any[], label?: string[]) => {
  return array.map((item) => {
    if (label) {
      const text = label.map((e) => item[e]).toString();
      return { key: item["id"], label: text.replace(",", " ") };
    } else {
      return item.id;
    }
  });
};

/**
 * Reduce an object and remove its
 * null and undefined attributes
 * @param obj Object to reduce
 */
export const reduceObject = (obj: Object) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {}
  );
};

export const getColor = (key: string) => {
  return COLORS.find(o => o.key === key)?.value || null;
}
