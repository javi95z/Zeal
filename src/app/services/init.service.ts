import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { FavoritesService } from "./favorites.service";

@Injectable({
  providedIn: "root",
})
export class InitService {
  constructor(private auth: AuthService, private favs: FavoritesService) {}

  initAppRequests() {
    this.auth.getUser();
    this.favs.getFavorites();
  }
}
