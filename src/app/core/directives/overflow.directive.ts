import { Directive, Input, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[zOverflow]",
})
export class OverflowDirective implements OnInit {
  @Input() width: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.width) {
      const container = this.el.nativeElement as HTMLElement;
      container.style.whiteSpace = "nowrap";
      container.style.overflow = "hidden";
      container.style.textOverflow = "ellipsis";
      container.style.maxWidth = `${this.width}px`;
    }
  }
}
