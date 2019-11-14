import { Contact, User } from "./";

export class Project {
  id: number;
  code?: string;
  // comments: Comment[];
  contact: Contact;
  description?: string;
  end_date?: string | Date;
  name: string;
  priority: "low" | "medium" | "high";
  start_date?: string | Date;
  status: "open" | "completed" | "canceled";
  // tasks: Task[];
  users?: User[];
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Project) {
    Object.assign(this, values);
  }
}
