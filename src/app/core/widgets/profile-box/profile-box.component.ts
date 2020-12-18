import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { ProfileBox } from "@models";

@Component({
  selector: "z-profile-box",
  templateUrl: "./profile-box.component.html",
  styleUrls: ["./profile-box.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBoxComponent implements OnInit {
  @Input() hasImage: boolean;
  @Input() hasIcon: boolean;
  @Input() hasBackground: boolean;
  @Input() data: ProfileBox;
  constructor() {}

  ngOnInit(): void {}
}
