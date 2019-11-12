import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-action-table-menu",
  templateUrl: "./action-table-menu.component.html",
  styleUrls: ["./action-table-menu.component.scss"]
})
export class ActionTableMenuComponent {
  @Input() details: string[];
  @Output() event = new EventEmitter<string>();

  constructor() {}

  onEvent(event: string) {
    this.event.emit(event);
  }
}
