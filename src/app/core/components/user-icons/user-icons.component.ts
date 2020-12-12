import { Component, Input } from "@angular/core";

@Component({
  selector: "z-user-icons",
  templateUrl: "./user-icons.component.html",
  styleUrls: ["./user-icons.component.scss"],
})
export class UserIconsComponent {
  @Input() listValues: { id: number; name: string; profile_img: string }[];
  @Input() path: string;
  @Input() size = 30;

  constructor() {}
}
