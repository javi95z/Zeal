export interface ActivityLog {
  id: number;
  name?: string;
  user_id?: number;
  user?: object;
  item_id: number;
  item_type: string;
  description: string;
  ip_address: string;
  updated_at?: string | Date;
  created_at?: string | Date;
}
