import { Component, OnInit, Injector } from "@angular/core";
import { DetailClass } from "@core/classes";
import { Team } from "@models";
import { TEAM_FIELDS } from "@zeal/variables";
import { Observable } from "rxjs";

@Component({
  selector: "z-team",
  templateUrl: "./profile.component.html",
})
export class TeamProfile extends DetailClass<Team> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "teams";
    this.fields = TEAM_FIELDS;
  }

  ngOnInit() {
    this.getResource();
  }

  protected buildProfileBox(): Observable<object> {
    return new Observable((observer) => {
      if (!this.resource) observer.next(null);
      const pb = {
        id: this.resource.id,
        title: this.resource.name,
        resourceName: this.resourceName.slice(0, -1),
        icon: "group-work",
        stats: [{ label: "members", number: this.resource.users.length | 0 }],
      };
      observer.next(pb);
    });
  }

  protected buildTextBox(): Observable<object> {
    return new Observable((observer) => {
      if (_.isEmpty(this.resource.description)) observer.next(null);
      const res = {
        title: "Description",
        text: this.resource.description,
      };
      observer.next(res);
    });
  }
}
