import { reduceObject } from "@zeal/utils";

export class Team {
  id: number;
  background_img: string;
  description?: string;
  name: string;
  profile_img: string;
  updated_at?: string | Date;
  created_at?: string | Date;
  deleted_at?: string | Date;

  constructor(values: Team) {
    Object.assign(this, reduceObject(values));
  }
}
