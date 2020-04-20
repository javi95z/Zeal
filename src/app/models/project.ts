import { Contact } from "./contact";
import { User } from "./user";
import { Task } from "./task";
import { PROJECT_PRIORITY, PROJECT_STATUS } from "@zeal/variables";
import { reduceObject } from "@zeal/utils";

type Priority = typeof PROJECT_PRIORITY[number];
type Status = typeof PROJECT_STATUS[number];

export class Project {
  id: number;
  code?: string;
  // comments: Comment[];
  contact?: Contact;
  description?: string;
  end_date?: string | Date;
  name: string;
  priority: Priority;
  start_date?: string | Date;
  status: Status;
  tasks: Task[];
  users?: User[];
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Project) {
    Object.assign(this, reduceObject(values));
    this.users = values.users ? values.users.map((o) => new User(o)) : null;
    this.tasks = values.tasks ? values.tasks.map((o) => new Task(o)) : null;
    this.contact = values.contact ? new Contact(values.contact) : null;
  }
}
