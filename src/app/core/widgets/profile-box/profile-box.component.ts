import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-profile-box",
  templateUrl: "./profile-box.component.html",
  styleUrls: ["./profile-box.component.scss"],
})
export class ProfileBoxComponent {
  @Input() hasImage: boolean;
  @Input() hasIcon: boolean;
  @Input() hasBackground: boolean;
  @Input() canEdit: boolean;
  @Input() data: ProfileBox;
  @Output() editAction = new EventEmitter();

  constructor() {}

  protected emitAction() {
    this.editAction.emit(true);
  }
}

interface ProfileBox {
  title: string;
  resourceName: string;
  subtitle?: string;
  profileImage?: string;
  backgroundImage?: string;
  icon?: string;
  stats?: { number: number; label: string }[];
}
