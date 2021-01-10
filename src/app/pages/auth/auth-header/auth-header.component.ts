import { Component, OnInit } from "@angular/core";
import { AUTH_TEXTS } from "@zeal/dict";
import { Router } from "@angular/router";

@Component({
  selector: "z-auth-header",
  templateUrl: "./auth-header.component.html",
  styleUrls: ["./auth-header.component.scss"],
})
export class AuthHeaderComponent implements OnInit {
  dict = AUTH_TEXTS;

  constructor(private router: Router) {}

  ngOnInit() {}
}
