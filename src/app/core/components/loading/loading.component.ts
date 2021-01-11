import { Component } from "@angular/core";

@Component({
  selector: "z-loading",
  templateUrl: "./loading.component.html",
  styles: [
    `
      .panel-progress-bar {
        display: flex;
        text-align: center;
        justify-content: center;
        margin: 0 -5px;
        margin-bottom: -4px;
        z-index: 2;
        mat-progress-bar {
          border-radius: 2px 2px 0 0;
        }
      }
    `,
  ],
})
export class LoadingComponent {
  constructor() {}
}
