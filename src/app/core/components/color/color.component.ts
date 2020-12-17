import { Component, Input } from "@angular/core";

@Component({
  selector: "z-color",
  templateUrl: "./color.component.html",
  styles: [
    `
      .dot {
        border: 1px solid #ffffff;
        border-radius: 50%;
        display: inline-block;
        height: 20px;
        margin-right: 10px;
        vertical-align: middle;
        width: 20px;
      }
    `,
  ],
})
export class ColorComponent {
  @Input() value: string;
}
