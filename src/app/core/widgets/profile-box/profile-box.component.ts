import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ApiService, AuthService } from "@services";

@Component({
  selector: "z-profile-box",
  templateUrl: "./profile-box.component.html",
  styleUrls: ["./profile-box.component.scss"],
})
export class ProfileBoxComponent implements OnInit {
  isFavorite: boolean;
  obj: any;
  @Input() data: ProfileBox;
  @Input() hasImage: boolean;
  @Input() hasIcon: boolean;
  @Input() hasBackground: boolean;
  @Input() canEdit: boolean;
  @Output() editAction = new EventEmitter();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.obj = {
      item_id: this.data.id,
      item_type: this.data.resourceName + "s",
    };
    this.checkFavorite(this.obj);
  }

  protected checkFavorite(object: { item_id: number; item_type: string }) {
    this.auth.favorites.then((res: Array<any>) => {
      const a = res.findIndex(
        (o) => o.item_id == object.item_id && o.item_type == object.item_type
      );
      if (a !== -1) this.isFavorite = true;
    });
  }

  protected emitAction() {
    this.editAction.emit(true);
  }

  /**
   * Star or unstar a resource
   */
  protected star() {
    this.isFavorite = true;
    // this.api.createOne("favorites", this.obj, true).then((o) => console.log(o));
    // .finally(() => (this.isLoading = false));
  }

  protected unstar() {
    this.isFavorite = false;
    // this.
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
