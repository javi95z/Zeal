import { ApiCollection, ApiResource } from "@models";

export const PROJECT_PRIORITY = ["low", "medium", "high"];
export const PROJECT_STATUS = ["open", "completed", "canceled"];
export const GENDER = ["female", "male"];
export const STANDARD_MENU = [
  {
    name: "Dashboard",
    link: "dashboard",
    icon: "view-dashboard"
  }
];
export const ADMIN_MENU = [
  {
    name: "Users",
    link: "users",
    icon: "accounts-alt"
  },
  {
    name: "Projects",
    link: "projects",
    icon: "case"
  },
  {
    name: "Teams",
    link: "teams",
    icon: "group-work"
  },
  {
    name: "Other",
    link: "other",
    icon: "more"
  }
];
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
export const PROJECT_FIELDS: Field[] = [
  {
    key: "code",
    label: "Code",
    type: "text"
  },
  {
    key: "name",
    label: "Name",
    type: "text"
  },
  {
    key: "description",
    label: "Description",
    type: "textarea"
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: PROJECT_PRIORITY
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: PROJECT_STATUS
  },
  {
    key: "start_date",
    label: "Start date",
    type: "date"
  },
  {
    key: "end_date",
    label: "End date",
    type: "date"
  }
];
export const USER_FIELDS: Field[] = [
  {
    key: "suffix",
    label: "Suffix",
    type: "text"
  },
  {
    key: "first_name",
    label: "First Name",
    type: "text"
  },
  {
    key: "last_name",
    label: "Last Name",
    type: "text"
  },
  {
    key: "email",
    label: "Email",
    type: "email"
  },
  {
    key: "gender",
    label: "Gender",
    type: "select",
    options: GENDER
  },
  {
    key: "active",
    label: "Active",
    type: "boolean"
  }
];
export interface PanelAction {
  name: string;
  icon: string;
  action: string;
}
export const PANEL_ACTIONS: PanelAction[] = [
  {
    name: "Edit",
    icon: "edit",
    action: "EDIT"
  },
  {
    name: "Go to list",
    icon: "view-list-alt",
    action: "LIST"
  },
  {
    name: "Delete",
    icon: "delete",
    action: "DELETE"
  }
];
