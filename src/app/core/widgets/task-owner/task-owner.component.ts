import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "@models";

@Component({
  selector: "z-task-owner",
  templateUrl: "./task-owner.component.html",
})
export class TaskOwnerWidget {
  @Input() data: User;
  @Input() title: string;
  @Input() canEdit = false;
  @Output() action = new EventEmitter<boolean>();

  protected emitAction = () => this.action.emit(true);
}
