import { Component, OnInit, Injector } from "@angular/core";
import { Role } from "@models";
import { AdminSingleClass } from "@core/classes/adminsingle";
import { ROLE_FIELDS } from "@zeal/variables";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class RoleProfileAdmin extends AdminSingleClass<Role> implements OnInit {
  usersCount = 0;
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "roles";
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
        this.editResource(ROLE_FIELDS);
        break;
      case "DELETE":
        this.deleteResource();
        break;
    }
  }
}
