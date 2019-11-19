import { Component } from "@angular/core";
import { AuthService, SidebarService } from "@services";
import { User } from "@models";

@Component({
  selector: "z-admin-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  currentUser: User;
  isCollapsed: boolean;

  constructor(public auth: AuthService, private sidebar: SidebarService) {
    this.auth.currentUser.then(res => (this.currentUser = new User(res)));
    this.sidebar
      .getSidebarCollapsed()
      .subscribe(res => (this.isCollapsed = res));
  }

  // TODO: Make it into a route
  logOut() {
    this.auth.doLogout();
  }

  collapseSidebar() {
    this.sidebar.setSidebarCollapsed(!this.isCollapsed);
  }
}
