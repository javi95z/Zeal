import { Component, OnInit, Injector } from "@angular/core";
import { Contact, Project } from "@models";
import { DetailClass } from "@core/classes";
import { CONTACT_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
})
export class ContactProfileAdmin
  extends DetailClass<Contact>
  implements OnInit {
  projectsCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "contacts";
    this.fields = CONTACT_FIELDS;
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countProjects = (n: number) => (this.projectsCount = n);

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "contacts"]);
        break;
      case "EDIT":
        this.editResource();
        break;
      case "DELETE":
        this.deleteResource();
        break;
    }
  }
}
