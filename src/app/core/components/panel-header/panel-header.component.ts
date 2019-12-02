import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-panel-header",
  templateUrl: "./panel-header.component.html",
  styleUrls: ["./panel-header.component.scss"]
})
export class PanelHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() titleLink: string;
  @Input() menu: any[];
  @Input() hideBack: boolean;
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  emitAction(event: string) {
    this.action.emit(event);
  }
}
