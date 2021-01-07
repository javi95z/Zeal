import { Component } from "@angular/core";

@Component({
  selector: "z-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  year = new Date().getFullYear();
  github = "https://github.com/javi95z";

  constructor() {}
}
