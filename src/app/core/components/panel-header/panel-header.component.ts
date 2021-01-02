import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";

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

  constructor(private location: Location) {}

  protected emitAction(event: string) {
    this.action.emit(event);
  }

  protected goBack() {
    this.location.back();
  }
}
