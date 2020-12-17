import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-panel-header",
  templateUrl: "./panel-header.component.html",
})
export class PanelHeaderComponent {
  @Input() title: string;
  @Input() titleLink: string;
  @Input() menu: any[];
  @Input() hideBack: boolean;
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  emitAction(event: string) {
    this.action.emit(event);
  }
}
