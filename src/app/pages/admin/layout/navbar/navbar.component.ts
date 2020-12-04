import { Component } from "@angular/core";
import { AuthService, LayoutService } from "@services";
import { User } from "@models";

@Component({
  selector: "z-admin-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarAdmin {
  currentUser: User;
  sidebarCollapsed: boolean;
  mobileNavCollapsed: boolean;

  constructor(public auth: AuthService, private ui: LayoutService) {
    this.auth.currentUser.then(res => (this.currentUser = new User(res)));
    this.ui.getSidebar().subscribe(res => (this.sidebarCollapsed = res));
    this.ui.getMobileNav().subscribe(res => (this.mobileNavCollapsed = res));
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
}
