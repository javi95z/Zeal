import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[zHeaderButton]"
})
export class HeaderButtonDirective implements OnInit {
  @Input() value: string;
  padding = 20;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const button = this.createButton();
    this.el.nativeElement.style.position = "absolute";
    this.el.nativeElement.style.right = `${this.padding}px`;
    this.el.nativeElement.style.top = `-${this.padding}px`;
    this.renderer.appendChild(this.el.nativeElement, button);
  }

  private createButton(): HTMLElement {
    let button: HTMLElement;
    button = this.renderer.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-zeal");
    button.classList.add("btn-circle");
    button.classList.add("mat-elevation-z5");
    button.appendChild(this.createIcon());
    return button;
  }

  private createIcon(): HTMLElement {
    let icon: HTMLElement;
    icon = this.renderer.createElement("i");
    icon.style.fontSize = "25px";
    icon.classList.add("zmdi");
    icon.classList.add(this.iconAttributes());
    return icon;
  }

  private iconAttributes(): string {
    let icon = "zmdi-";
    switch (this.value) {
      case "create":
        icon += "plus";
        break;
    }
    return icon;
  }
}
