import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "z-header",
  templateUrl: "./header.component.html",
  styles: [
    `
      .breadcrumb span {
        color: #777777;
        &.active {
          color: #222222;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() current: string;
  breadcrumbs: string[];

  constructor(private router: Router) {
    this.breadcrumbs = this.router.url.split("/").slice(1);
  }
}
