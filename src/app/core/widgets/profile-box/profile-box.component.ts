import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProfileBox } from "@models";

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

  ngOnInit(): void {}

  protected emitAction() {
    this.editAction.emit(true);
  }
}
