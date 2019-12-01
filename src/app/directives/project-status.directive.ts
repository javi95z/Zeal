import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[projectStatus]"
})
export class ProjectStatusDirective implements OnInit {
  @Input() projectStatus: string;
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const color = this.getColor(this.projectStatus);
    this.el.nativeElement.classList.add("label");
    this.el.nativeElement.classList.add(`bg-${color}`);
  }

  getColor(status: string): string {
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
