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
    | "date";
  required?: boolean;
  options?: any[];
}
