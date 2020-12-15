import { Component, Input } from "@angular/core";

@Component({
  selector: "z-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"],
})
export class ColorComponent {
  @Input() value: string;

  constructor() {}
}
