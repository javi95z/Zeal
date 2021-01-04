import { Component, OnInit, Injector } from "@angular/core";
import { Role } from "@models";
import { DetailClass } from "@core/classes";
import { ROLE_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
})
export class RoleProfileAdmin extends DetailClass<Role> implements OnInit {
  usersCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "roles";
    this.fields = ROLE_FIELDS;
  }

  ngOnInit() {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  countUsers = (n: number) => (this.usersCount = n);

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "roles"]);
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
