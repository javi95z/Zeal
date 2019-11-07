import { Role } from "./role";
import { Team } from "./team";

export class User {
  id: number;
  active: boolean;
  api_token: string;
  background_img: string;
  email: string;
  first_name: string;
  gender: "female" | "male";
  is_admin: boolean;
  last_name: string;
  profile_img: string;
  role?: Role;
  teams?: Team[];
  suffix: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: User) {
    Object.assign(this, values);
  }

  get fullName(): string {
    return `${this.first_name || ""} ${this.last_name || ""}`;
  }
}
