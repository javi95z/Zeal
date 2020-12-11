import { Component, Input } from "@angular/core";

@Component({
  selector: "z-user-icons",
  templateUrl: "./user-icons.component.html",
  styles: [
    `
      .user-icon {
        display: inline-block;
        margin-right: 5px;
      }
    `,
  ],
})
export class UserIconsComponent {
  @Input() listValues: { id: number; name: string; profile_img: string }[];
  @Input() path: string;

  constructor() {}
}
