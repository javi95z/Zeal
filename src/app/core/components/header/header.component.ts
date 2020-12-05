import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "z-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() current: string;
  breadcrumbs: string[];

  constructor(private router: Router) {
    this.breadcrumbs = this.router.url.split("/").slice(1);
  }
}
