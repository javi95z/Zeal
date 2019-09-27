export class User {
  id: number;
  api_token: string;
  background_img: string;
  email: string;
  first_name: string;
  gender: "female" | "male";
  is_admin: boolean;
  last_name: string;
  profile_img: string;
  suffix: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: User) {
    Object.assign(this, values);
  }

  getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
