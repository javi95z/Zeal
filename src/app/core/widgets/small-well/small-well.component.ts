import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "@models";

@Component({
  selector: "z-small-well",
  templateUrl: "./small-well.component.html",
  styleUrls: ["../widgets.scss"],
})
export class SmallWellWidget {
  @Input() title: string;
  @Input() canEdit = false;
  @Output() action = new EventEmitter<boolean>();

  protected emitAction = () => this.action.emit(true);
}
