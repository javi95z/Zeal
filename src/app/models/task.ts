import { reduceObject } from "@zeal/utils";
import { PROJECT_PRIORITY, PROJECT_STATUS } from "@zeal/variables";

type Priority = typeof PROJECT_PRIORITY[number];
type Status = typeof PROJECT_STATUS[number];

export class Task {
  id: number;
  code?: string;
  description?: string;
  end_date?: string | Date;
  name: string;
  priority: Priority;
  start_date?: string | Date;
  status: Status;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Task) {
    Object.assign(this, reduceObject(values));
  }
}
