import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[zAvatar]",
})
export class AvatarDirective implements OnInit {
  @Input("zAvatar") image: string;
  @Input() circled: number;
  @Input() extraClasses: string[];

  public defaultImage = "assets/img/avatar/default.png";

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.appendChild(this.el.nativeElement, this.createElement());
  }

  private createElement(): HTMLElement {
    let image: HTMLElement;
    image = this.renderer.createElement("img");
    image.setAttribute("src", this.image || this.defaultImage);
    image.style.maxWidth = "100%";
    image.style.height = "auto";
    if (this.circled) {
      image.classList.add("img-circle");
      image.style.height = `${this.circled}px`;
      image.style.width = `${this.circled}px`;
    }
    if (this.extraClasses)
      this.extraClasses.forEach((o) => image.classList.add(o));
    return image;
  }
}
