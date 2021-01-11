import { Component } from "@angular/core";

@Component({
  selector: "z-loading",
  templateUrl: "./loading.component.html",
  styles: [
    `
      .mat-progress-bar {
        border-radius: 2px 2px 0 0;
      }
      .panel-progress-bar {
        background: rgba(255, 255, 255, 0.8) none repeat scroll 0 0;
        cursor: wait;
        height: 100%;
        left: 0;
        margin: 0 !important;
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
      }
    `,
  ],
})
export class LoadingComponent {}
