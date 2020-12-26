import { Component } from "@angular/core";
import { ApiService, AuthService } from "@services";
import { MenuItem, User } from "@models";
import { STANDARD_MENU, RESOURCE_ICONS } from "@zeal/variables";

@Component({
  selector: "z-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  protected menuItems: MenuItem[];
  favorites: FavoriteMenuItem[] = [];

  constructor(private auth: AuthService) {
    this.menuItems = STANDARD_MENU;
    this.auth.favorites.then((res) => this.buildMenu(res));
  }

  private buildMenu(items: any) {
    items.map((o) => {
      this.favorites.push({
        label: o.name,
        icon: this.getIcon(o.item_type),
        link: ["/content", o.item_type, "profile", o.item_id],
      });
    });
  }

  // Get icon for the specified resource
  protected getIcon = (key: string) =>
    RESOURCE_ICONS.find((o) => o.key === key).icon || null;
}

interface FavoriteMenuItem {
  label: string;
  icon: string;
  link: string[];
}
