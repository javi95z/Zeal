import { Component, OnInit } from "@angular/core";
import { SidebarService } from "@zeal/services";

@Component({
  selector: "z-admin",
  templateUrl: "./admin.component.html",
  styles: []
})
export class AdminComponent implements OnInit {
  sidebarCollapsed: boolean;

  constructor(private sidebar: SidebarService) {}

  ngOnInit() {
    this.sidebar
      .getSidebarCollapsed()
      .subscribe(res => (this.sidebarCollapsed = res));
  }
}
