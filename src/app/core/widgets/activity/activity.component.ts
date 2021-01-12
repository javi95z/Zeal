import { Component, Input } from "@angular/core";
import { ActivityLog } from "@models";

@Component({
  selector: "z-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
})
export class ActivityWidget {
  @Input() data: ActivityLog[];

  protected isSameAsPrevious(i: number) {
    if (i < 1) return false;
    const collection = this.data["data"];
    return collection[i].user?.id === collection[i - 1].user?.id;
  }
}
