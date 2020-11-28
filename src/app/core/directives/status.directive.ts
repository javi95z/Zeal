import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[zStatus]"
})
export class StatusDirective implements OnInit {
  @Input() value: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.value) {
      const element = this.createLabel();
      this.renderer.appendChild(this.el.nativeElement, element);
    }
  }

  private createLabel(): HTMLElement {
    let container: HTMLElement;
    container = this.renderer.createElement("span");
    const color = this.getColor();
    container.classList.add("label");
    container.classList.add(`bg-${color}`);
    container.textContent = this.value;
    return container;
  }

  private getColor(): string {
    switch (this.value) {
      case "open":
        return "blue";
      case "completed":
        return "success";
      case "canceled":
        return "danger";
      default:
        break;
    }
  }
}
