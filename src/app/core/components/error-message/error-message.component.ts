import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "z-error-message",
  templateUrl: "./error-message.component.html",
})
export class ErrorMessageComponent implements OnInit {
  status: string;
  title: string;

  constructor(private location: Location) {}

  ngOnInit() {
    this.status = "404";
    this.title = "Page not found";
  }

  goBack(): void {
    this.location.back();
  }
}
