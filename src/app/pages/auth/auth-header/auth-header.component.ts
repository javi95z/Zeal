import { Component, OnInit } from "@angular/core";
import { AUTH_TEXTS } from "@zeal/dict";

@Component({
  selector: "z-auth-header",
  templateUrl: "./auth-header.component.html",
})
export class AuthHeaderComponent implements OnInit {
  texts: object;

  constructor() {
    this.texts = AUTH_TEXTS;
  }

  ngOnInit() {}
}
