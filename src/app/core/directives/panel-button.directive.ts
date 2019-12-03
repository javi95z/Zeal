import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[zPanelButton]"
})
export class PanelButtonDirective implements OnInit {
  @Input() value: string;
  @Input() hideLabel: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const container = this.el.nativeElement as HTMLElement;
    container.classList.add("block");
    container.classList.add("bg-zeal");
    container.classList.add("ma-10");
  }
}
