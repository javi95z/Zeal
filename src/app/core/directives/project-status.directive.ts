import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[zProjectStatus]"
})
export class ProjectStatusDirective implements OnInit {
  @Input() value: string;
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const color = this.getColor(this.value);
    this.el.nativeElement.classList.add("label");
    this.el.nativeElement.classList.add(`bg-${color}`);
  }

  private getColor(status: string): string {
    switch (status) {
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
