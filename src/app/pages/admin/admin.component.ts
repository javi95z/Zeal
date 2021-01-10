import { Component, OnInit } from "@angular/core";
import { LayoutService } from "@services";

@Component({
  selector: "z-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  sidebarCollapsed: boolean;
  mobileNavCollapsed: boolean;

  constructor(private ui: LayoutService) {}

  ngOnInit() {
    this.ui.getSidebar().subscribe(res => (this.sidebarCollapsed = res));
    this.ui.getMobileNav().subscribe(res => (this.mobileNavCollapsed = res));
  }
}
