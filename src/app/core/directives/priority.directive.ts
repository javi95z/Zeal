import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";
import { CapitalizePipe } from "@core/pipes";

@Directive({
  selector: "[zPriority]",
  providers: [CapitalizePipe]
})
export class PriorityDirective implements OnInit {
  @Input() value: string;
  @Input() hideLabel: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private capitalize: CapitalizePipe
  ) {}

  ngOnInit(): void {
    const element = this.createIcon();
    this.renderer.appendChild(this.el.nativeElement, element);
  }

  private createIcon(): HTMLElement {
    let container: HTMLElement;
    container = this.renderer.createElement("div");
    let icon: HTMLElement;
    icon = this.renderer.createElement("i");
    icon.classList.value = this.iconAttributes();
    icon.classList.add("mr-5");
    container.appendChild(icon);
    if (!this.hideLabel) {
      let text: HTMLElement;
      text = this.renderer.createText(this.capitalize.transform(this.value));
      container.appendChild(text);
    }
    return container;
  }

  private iconAttributes(): string {
    let icon = "zmdi zmdi-";
    switch (this.value) {
      case "low":
        icon += "long-arrow-down text-danger";
        break;
      case "high":
        icon += "long-arrow-up text-success";
        break;
      default:
        icon += "long-arrow-right";
        break;
    }
    return icon;
  }
}
