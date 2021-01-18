import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-panel-search",
  templateUrl: "./panel-search.component.html",
  styleUrls: ["./panel-search.component.scss"],
})
export class PanelSearchComponent {
  @Output() searchQuery = new EventEmitter<string>();
  searchOn = false;

  onSearch = (event: string) => this.searchQuery.next(event);
  toggleSearch = () => (this.searchOn = !this.searchOn);
}
