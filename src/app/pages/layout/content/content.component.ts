import { Component, OnInit } from "@angular/core";
import { SidebarService } from "@zeal/services";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styles: []
})
export class ContentComponent implements OnInit {
  sidebarCollapsed: boolean;

  constructor(private sidebar: SidebarService) {}

  ngOnInit() {
    this.sidebar
      .getSidebarCollapsed()
      .subscribe(res => (this.sidebarCollapsed = res));
  }
}
