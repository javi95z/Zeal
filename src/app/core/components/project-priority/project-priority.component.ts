import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "z-project-priority",
  templateUrl: "./project-priority.component.html",
  styleUrls: ["./project-priority.component.scss"]
})
export class ProjectPriorityComponent implements OnInit {
  @Input() priority: string;
  @Input() hideLabel: boolean;
  icon: string;
  color: string;

  constructor() {}

  ngOnInit() {
    this.buildIcon();
  }

  private buildIcon(): void {
    switch (this.priority) {
      case "low":
        this.icon = "long-arrow-down";
        this.color = "text-danger";
        break;
      case "high":
        this.icon = "long-arrow-up";
        this.color = "text-success";
        break;
      default:
        this.icon = "long-arrow-right";
        break;
    }
  }
}
