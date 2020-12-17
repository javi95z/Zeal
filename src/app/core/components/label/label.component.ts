import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "z-label",
  templateUrl: "./label.component.html",
  styles: [
    `
      .label {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() value: string;
  @Input() size: number = 10;
}
