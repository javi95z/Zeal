export class Team {
  id: number;
  background_img: string;
  description?: string;
  name: string;
  profile_img: string;
  private updated_at?: string | Date;
  private created_at?: string | Date;
  private deleted_at?: string | Date;

  constructor(values: Team) {
    Object.assign(this, values);
  }
}
