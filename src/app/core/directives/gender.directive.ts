import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { CapitalizePipe } from "@core/pipes";

@Directive({
  selector: "[zGender]",
  providers: [CapitalizePipe]
})
export class GenderDirective implements OnInit {
  @Input() value: string;
  @Input() hideLabel: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private capitalize: CapitalizePipe
  ) {}

  ngOnInit(): void {
    const element = this.createElement();
    this.renderer.appendChild(this.el.nativeElement, element);
  }

  private createElement(): HTMLElement {
    let container: HTMLElement;
    container = this.renderer.createElement("div");
    let icon: HTMLElement;
    icon = this.renderer.createElement("i");
    icon.classList.add("mr-5");
    icon.classList.add("zmdi");
    icon.classList.add(this.getIcon());
    icon.classList.add(this.getColor());
    icon.style.display = "inline-block";
    icon.style.fontFamily = "Material-Design-Iconic-Font";
    icon.style.fontSize = "1.5em";
    icon.style.lineHeight = ".75em";
    icon.style.textAlign = "center";
    icon.style.verticalAlign = "-15%";
    icon.style.width = "1em";
    container.appendChild(icon);
    if (!this.hideLabel) {
      let text: HTMLElement;
      text = this.renderer.createElement("span");
      text.textContent = this.capitalize.transform(this.value);
      container.appendChild(text);
    }
    return container;
  }

  private getIcon(): string {
    switch (this.value) {
      case "female":
        return "zmdi-female";
      case "male":
        return "zmdi-male";
    }
  }

  private getColor(): string {
    switch (this.value) {
      case "female":
        return "text-pink";
      case "male":
        return "text-lightblue";
    }
  }
}
