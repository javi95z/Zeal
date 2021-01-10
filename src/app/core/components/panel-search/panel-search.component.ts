import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "z-panel-search",
  templateUrl: "./panel-search.component.html",
  styleUrls: ["./panel-search.component.scss"],
})
export class PanelSearchComponent {
  @Output() searchQuery = new EventEmitter<string>();
  private searchOn = false;

  protected onSearch = (event: string) => this.searchQuery.next(event);
  protected toggleSearch = () => (this.searchOn = !this.searchOn);
}
