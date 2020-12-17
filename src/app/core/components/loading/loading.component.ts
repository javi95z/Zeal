import { Component } from "@angular/core";

@Component({
  selector: "z-loading",
  templateUrl: "./loading.component.html",
  styles: [
    `
      .loading-shade {
        margin: 30px 0;
        mat-spinner {
          margin: auto;
        }
      }
    `,
  ],
})
export class LoadingComponent {
  constructor() {}
}
