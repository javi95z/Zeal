import { Component } from "@angular/core";
import { MenuItem } from "@zeal/models";
import { STANDARD_MENU } from "@zeal/variables";

@Component({
  selector: "z-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  protected menuItems: MenuItem[];

  constructor() {
    this.menuItems = STANDARD_MENU;
  }
}
