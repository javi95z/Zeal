import { Component, OnInit, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Contact } from "@models";

@Component({
  selector: "z-admin-contacts",
  templateUrl: "./contacts.component.html",
})
export class ContactsAdmin extends ListClass<Contact> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "contacts";
    // this.fields = ;
    this.columns = [
      "select",
      "name",
      "business_type",
      "phone_number",
      "mobile_phone",
      "website",
      "actions",
    ];
  }

  ngOnInit(): void {
    this.initData();
  }

  protected onAction(action: string, contact: Contact, index: number) {
    switch (action) {
      case "EDIT":
        // this.editData(contact, contact.id, index);
        break;
      case "DELETE":
        // this.deleteData(contact.id, index, contact.name);
        break;
    }
  }
}
