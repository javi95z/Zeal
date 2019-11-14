export class Contact {
  id: number;
  //   account?: Account;
  bio?: string;
  //   business_type?: string;
  description?: string;
  discount?: number;
  email?: string;
  fax?: string;
  mobile_phone?: number;
  name: string;
  phone_number?: string;
  skype?: string;
  website?: string;
  updated_at?: string | Date;
  created_at?: string | Date;

  constructor(values: Contact) {
    Object.assign(this, values);
  }
}
