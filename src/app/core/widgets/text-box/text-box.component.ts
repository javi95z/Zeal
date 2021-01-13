import { Component, Input } from "@angular/core";

@Component({
  selector: "z-text-box",
  templateUrl: "./text-box.component.html",
})
export class TextBoxComponent {
  @Input() data: TextBox;
}

interface TextBox {
  title: string;
  text: string;
}
