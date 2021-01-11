import { Component } from "@angular/core";
import { AuthService, LayoutService } from "@services";
import { User } from "@models";

@Component({
  selector: "z-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  currentUser: User;
  sidebarCollapsed: boolean;
  mobileNavCollapsed: boolean;
  isFullscreen: boolean;

  constructor(public auth: AuthService, private ui: LayoutService) {
    this.auth.user$.subscribe((o) => (this.currentUser = o));
    this.ui.getSidebar().subscribe((res) => (this.sidebarCollapsed = res));
    this.ui.getMobileNav().subscribe((res) => (this.mobileNavCollapsed = res));
    this.ui.getFullscreen().subscribe((res) => (this.isFullscreen = res));
  }

  // TODO: Make it into a route
  logOut() {
    this.auth.doLogout();
  }

  collapseSidebar() {
    this.ui.setSidebar(!this.sidebarCollapsed);
  }

  collapseMobileNav() {
    this.ui.setMobileNav(!this.mobileNavCollapsed);
  }

  toggleFullscreen() {
    this.ui.setFullscreen(!this.isFullscreen);
  }
}
