import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { formatDate } from "@zeal/utils";

@Directive({
  selector: "[zExpiredDate]",
})
export class ExpiredDateDirective implements OnInit {
  @Input("zExpiredDate") date: string;
  @Input() color: string;
  private today: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.today = formatDate(new Date());
    if (this.today > this.date) {
      this.renderer.setStyle(this.el.nativeElement, "color", this.color || "red");
    }
  }
}
