import { reduceObject } from "@zeal/utils";

export class Report {
  id: number;
  invested_hours: number;
  user?: any;
  task?: any;
  comment?: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Report) {
    Object.assign(this, reduceObject(values));
  }
}
