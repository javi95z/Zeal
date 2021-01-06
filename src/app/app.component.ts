import { Component } from "@angular/core";
import { AuthService, InitService } from "@services";

@Component({
  selector: "app-root",
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = "Zeal";

  constructor(private auth: AuthService, private init: InitService) {
    // Initial app requests
    if (this.auth.isLoggedIn) {
      this.init.initAppRequests();
    }
  }
}
