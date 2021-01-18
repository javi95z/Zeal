import { Component } from "@angular/core";
import { MenuItem } from "@zeal/models";
import { ADMIN_MENU } from "@zeal/variables";

@Component({
  selector: "z-admin-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarAdmin {
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = ADMIN_MENU;
  }
}
