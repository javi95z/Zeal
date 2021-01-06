import { Component, OnInit } from "@angular/core";
import { FavoritesService } from "@services";
import { MenuItem, Favorite } from "@models";
import { STANDARD_MENU, RESOURCE_ICONS } from "@zeal/variables";

@Component({
  selector: "z-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  protected menuItems: MenuItem[];
  favorites: FavoriteMenuItem[];

  constructor(private fav: FavoritesService) {
    this.menuItems = STANDARD_MENU;
  }

  ngOnInit(): void {
    this.fav.favs$.subscribe((o) => this.buildMenu(o));
  }

  private buildMenu(items: Favorite[]) {
    this.favorites = [];
    items.map((o) => {
      this.favorites.push({
        label: o.name,
        icon: this.getIcon(o.item_type),
        link: `${o.item_type}/profile/${o.item_id}`,
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
  link: string;
}
