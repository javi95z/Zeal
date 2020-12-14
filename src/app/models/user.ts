import { reduceObject } from "@zeal/utils";

export class User {
  id: number;
  active = false;
  api_token: string;
  background_img: string;
  email: string;
  gender: "female" | "male";
  is_admin: boolean;
  name: string;
  profile_img: string;
  role?: any;
  suffix: string;
  teams?: any[];
  projects?: any[];
  tasks?: any[];
  locale: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: User) {
    Object.assign(this, reduceObject(values));
  }

  get imagePath(): string {
    return this.profile_img || `assets/img/avatar/default.png`;
  }
}
