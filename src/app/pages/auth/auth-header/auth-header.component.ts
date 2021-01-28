import { Component } from "@angular/core";
import { AUTH_TEXTS } from "@zeal/dict";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "z-auth-header",
  templateUrl: "./auth-header.component.html",
  styleUrls: ["./auth-header.component.scss"],
})
export class AuthHeaderComponent {
  dict = AUTH_TEXTS;
  currentUrl: string;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) this.currentUrl = val.url;
    });
  }
}
