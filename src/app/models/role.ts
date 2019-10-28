export class Role {
  id: number;
  color: string;
  description: string;
  name: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Role) {
    Object.assign(this, values);
  }
}
