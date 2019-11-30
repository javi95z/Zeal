import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "z-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() current: string;
  breadcrumbs: string[];

  constructor(private router: Router) {
    this.breadcrumbs = this.buildBreadcrumbs();
  }

  ngOnInit() {}

  private buildBreadcrumbs(): string[] {
    const result: string[] = [];
    const current = this.router.url.split("/").slice(1);
    current.map(o => result.push(o));
    return result;
  }
}
