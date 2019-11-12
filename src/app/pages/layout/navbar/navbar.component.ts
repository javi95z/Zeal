import { Component } from "@angular/core";
import { AuthService } from "../../../services";
import { User } from "../../../models";

@Component({
  selector: "z-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  currentUser: User;

  constructor(public auth: AuthService) {
    this.auth.currentUser.then(res => (this.currentUser = new User(res)));
  }

  // TODO: Make it into a route
  logOut() {
    this.auth.doLogout();
  }
}
