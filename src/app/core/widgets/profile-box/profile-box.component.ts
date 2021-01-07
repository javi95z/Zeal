import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FavoritesService, ApiService } from "@services";
import { Favorite } from "@models";

@Component({
  selector: "z-profile-box",
  templateUrl: "./profile-box.component.html",
  styleUrls: ["./profile-box.component.scss"],
})
export class ProfileBoxComponent implements OnInit {
  private favorites: Favorite[];
  isFavorite: Favorite;
  @Input() data: ProfileBox;
  @Input() hasImage: boolean;
  @Input() hasIcon: boolean;
  @Input() hasBackground: boolean;
  @Input() canFavorite = true;
  @Input() canEdit: boolean;
  @Output() editAction = new EventEmitter();

  constructor(private fav: FavoritesService, private api: ApiService<any>) {}

  ngOnInit() {
    if (!this.canFavorite) return;
    this.fav.favs$.subscribe((o) => (this.favorites = o));
    this.checkFavorite({
      item_id: this.data.id,
      item_type: this.data.resourceName + "s",
    });
  }

  protected emitAction() {
    this.editAction.emit(true);
  }

  protected onProfileImage(event) {
    this.api
      .uploadImage(event.target.files[0], `users/${this.data.id}/profile-image`)
      .then((o: any) => (this.data.profileImage = o.data.profile_img));
  }

  /**
   * Star a resource
   * Add to API
   */
  protected star() {
    const obj = {
      item_id: this.data.id,
      item_type: this.data.resourceName + "s",
    };
    this.fav.addFavorite(obj);
    this.isFavorite = obj;
  }

  /**
   * Unstar a resource
   * Delete from API
   */
  protected unstar() {
    const id = this.checkFavorite(this.isFavorite).id;
    this.fav.removeFavorite(id);
    this.isFavorite = null;
  }

  private checkFavorite(object: { item_id: number; item_type: string }) {
    if (!this.favorites) return;
    const d = this.favorites.find(
      (o) => o.item_id === object.item_id && o.item_type === object.item_type
    );
    if (d) this.isFavorite = d;
    return d || null;
  }
}

interface ProfileBox {
  id: number;
  title: string;
  resourceName: string;
  subtitle?: string;
  profileImage?: string;
  backgroundImage?: string;
  icon?: string;
  stats?: { number: number; label: string }[];
}
