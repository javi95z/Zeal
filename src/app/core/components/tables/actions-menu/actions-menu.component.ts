import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "z-actions-menu",
  templateUrl: "./actions-menu.component.html",
  styleUrls: ["./actions-menu.component.scss"],
})
export class ActionsMenuComponent implements OnInit {
  @Input() isFavorite = false;
  @Input() hide: string[];
  @Output() event = new EventEmitter<string>();

  public actions = ["FAVORITE", "EDIT", "DELETE"];

  ngOnInit(): void {
    if (this.hide) {
      this.actions = this.actions.filter((o) => !this.hide.includes(o));
    }
  }

  onEvent(event: string) {
    this.event.emit(event);
  }
}
