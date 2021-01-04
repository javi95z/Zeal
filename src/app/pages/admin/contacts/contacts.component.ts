import { Component, OnInit, Injector } from "@angular/core";
import { ListClass } from "@core/classes";
import { Contact } from "@models";
import { CONTACT_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-contacts",
  templateUrl: "./contacts.component.html",
})
export class ContactsAdmin extends ListClass<Contact> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "contacts";
    this.fields = CONTACT_FIELDS;
    this.columns = [
      "select",
      "name",
      "type",
      "phone_number",
      "mobile_phone",
      "website",
      "actions",
    ];
  }

  ngOnInit(): void {
    this.initData();
  }
}
