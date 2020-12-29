import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "z-actions-menu",
  templateUrl: "./actions-menu.component.html",
  styleUrls: ["./actions-menu.component.scss"],
})
export class ActionsMenuComponent {
  @Input() isFavorite = false;
  @Output() event = new EventEmitter<string>();

  constructor() {}

  onEvent(event: string) {
    this.event.emit(event);
  }
}
