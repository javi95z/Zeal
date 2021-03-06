import { Field, PanelAction } from "@models";
import { Validators } from "@angular/forms";

export const PROJECT_PRIORITY = ["low", "medium", "high"];
export const PROJECT_STATUS = ["open", "completed", "canceled"];
export const CONTACT_TYPES = ["customer", "supplier"];
export const GENDER = ["female", "male"];
export const STANDARD_MENU = [
  {
    name: "Dashboard",
    link: "dashboard",
    icon: "view-dashboard",
  },
  {
    name: "Projects",
    link: "projects",
    icon: "case",
  },
  {
    name: "Tasks",
    link: "tasks",
    icon: "arrow-merge",
  },
  {
    name: "Teams",
    link: "teams",
    icon: "group-work",
  },
];
export const ADMIN_MENU = [
  {
    name: "Users",
    link: "users",
    icon: "accounts-alt",
  },
  {
    name: "Projects",
    link: "projects",
    icon: "case",
  },
  {
    name: "Tasks",
    link: "tasks",
    icon: "arrow-merge",
  },
  {
    name: "Teams",
    link: "teams",
    icon: "group-work",
  },
  {
    name: "Roles",
    link: "roles",
    icon: "badge-check",
  },
  {
    name: "Contacts",
    link: "contacts",
    icon: "account-box-phone",
  }
];
export const PROJECT_FIELDS: Field[] = [
  {
    key: "code",
    label: "Code",
    type: "text",
  },
  {
    key: "name",
    label: "Name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: PROJECT_PRIORITY,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: PROJECT_STATUS,
  },
  {
    key: "start_date",
    label: "Start date",
    type: "date",
  },
  {
    key: "end_date",
    label: "End date",
    type: "date",
  },
];
export const USER_FIELDS: Field[] = [
  {
    key: "suffix",
    label: "Suffix",
    type: "text",
    validators: [Validators.maxLength(10)],
  },
  {
    key: "name",
    label: "Full name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    validators: [Validators.required, Validators.email],
  },
  {
    key: "gender",
    label: "Gender",
    type: "select",
    options: GENDER,
  },
  {
    key: "locale",
    label: "Locale",
    type: "text",
  },
];
export const TASK_FIELDS: Field[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: PROJECT_PRIORITY,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: PROJECT_STATUS,
  },
  {
    key: "estimated_hours",
    label: "Estimated hours",
    type: "number",
  },
  {
    key: "start_date",
    label: "Start date",
    type: "date",
  },
  {
    key: "end_date",
    label: "End date",
    type: "date",
  },
];
export const TEAM_FIELDS: Field[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
];
export const ROLE_FIELDS: Field[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "color",
    label: "Color",
    type: "text",
    validators: [Validators.maxLength(7)],
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
];
export const CONTACT_FIELDS: Field[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
    validators: [Validators.required],
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    validators: [Validators.required, Validators.email],
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: CONTACT_TYPES,
  },
  {
    key: "bio",
    label: "Bio",
    type: "textarea",
  },
  {
    key: "discount",
    label: "Discount",
    type: "text",
  },
  {
    key: "phone_number",
    label: "Phone number",
    type: "text",
    validators: [Validators.maxLength(25)],
  },
  {
    key: "mobile_phone",
    label: "Mobile phone",
    type: "text",
    validators: [Validators.maxLength(25)],
  },
  {
    key: "skype",
    label: "Skype",
    type: "text",
  },
  {
    key: "fax",
    label: "Fax",
    type: "text",
  },
  {
    key: "website",
    label: "Website",
    type: "text",
    validators: [Validators.maxLength(100)],
  },
];
export const REPORT_FIELDS: Field[] = [
  {
    key: "invested_hours",
    label: "Invested Hours",
    type: "number",
    validators: [Validators.required],
  },
  {
    key: "comment",
    label: "Comment",
    type: "textarea",
  },
];
export const PANEL_ACTIONS: PanelAction[] = [
  {
    name: "Edit",
    icon: "edit",
    action: "EDIT",
  },
  {
    name: "Go to list",
    icon: "view-list-alt",
    action: "LIST",
  },
  {
    name: "Delete",
    icon: "delete",
    action: "DELETE",
  },
];
export const RESOURCE_ICONS: any[] = [
  {
    key: "users",
    icon: "accounts-alt",
  },
  {
    key: "projects",
    icon: "case",
  },
  {
    key: "teams",
    icon: "group-work",
  },
  {
    key: "tasks",
    icon: "arrow-merge",
  },
  {
    key: "roles",
    icon: "badge-check",
  },
  {
    key: "contacts",
    icon: "account-box-phone",
  },
];
export const COLORS = [
  {
    key: "open",
    value: "#0e3b84",
  },
  {
    key: "completed",
    value: "#2ecd99",
  },
  {
    key: "canceled",
    value: "#bf2424",
  },
  {
    key: "low",
    value: "#bf2424",
  },
  {
    key: "medium",
    value: "#878787",
  },
  {
    key: "high",
    value: "#2ecd99",
  },
];
