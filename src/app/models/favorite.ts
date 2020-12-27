import { reduceObject } from "@zeal/utils";

export class Favorite {
  id?: number;
  user_id?: number;
  item_id: number;
  item_type: string;
  name?: string;

  constructor(values: Favorite) {
    Object.assign(this, reduceObject(values));
  }
}
