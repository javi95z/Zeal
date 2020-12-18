import { Component, OnInit, Injector } from "@angular/core";
import { ListClass } from "@zeal/core/classes";
import { Role } from "@models";
import { ROLE_FIELDS } from "@zeal/variables";

@Component({
  selector: "z-admin-roles",
  templateUrl: "./roles.component.html",
})
export class RolesAdmin extends ListClass<Role> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "roles";
    this.fields = ROLE_FIELDS;
    this.columns = ["select", "name", "color", "actions"];
  }

  ngOnInit() {
    this.initData();
  }

  onAction(action: string, role: Role, index: number) {
    switch (action) {
      case "EDIT":
        this.editData(role, role.id, index);
        break;
      case "DELETE":
        this.deleteData(role.id, index, role.name);
        break;
    }
  }

  createRole() {
    this.createData();
  }
}
