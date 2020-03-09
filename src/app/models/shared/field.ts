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
  required?: boolean;
  options?: any[];
}
