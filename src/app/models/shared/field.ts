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
  options?: any[];
}
