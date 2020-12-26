import { Directive, Input, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[zOverflow]",
})
export class OverflowDirective implements OnInit {
  @Input("zOverflow") value: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const container = this.el.nativeElement as HTMLElement;
    container.style.whiteSpace = "nowrap";
    container.style.overflow = "hidden";
    container.style.textOverflow = "ellipsis";
    if (this.value) {
      container.style.maxWidth = `${this.value}px`;
    }
  }
}
