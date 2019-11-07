export class Role {
  id: number;
  color: string;
  description: string;
  name: string;
  private updated_at?: string | Date;
  private created_at?: string | Date;
  private deleted_at?: string | Date;

  constructor(values: Role) {
    Object.assign(this, values);
  }
}
