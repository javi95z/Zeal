import { Validators } from "@angular/forms";

export interface Field {
  key: string;
  label: string;
  type:
    | "text"
    | "email"
    | "textarea"
    | "select"
    | "multiple"
    | "boolean"
    | "toggle"
    | "date";
  options?: any[];
  validators?: Validators[];
}
