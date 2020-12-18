import { Component, OnInit, Injector } from "@angular/core";
import { AdminSingleClass } from "@core/classes";
import { Project, ProfileBox } from "@models";

@Component({
  selector: "z-project",
  templateUrl: "./project.component.html",
})
export class ProjectComponent
  extends AdminSingleClass<Project>
  implements OnInit {
  profileBox: ProfileBox;

  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "projects";
  }

  ngOnInit(): void {
    this.getResource().then((o) => {
      this.profileBox = this.buildProfileBox(o);
    });
  }

  private buildProfileBox(item: Project): ProfileBox {
    console.log(item, "item");
    return {
      title: item.name,
      resourceName: this.resourceName.slice(0, -1),
      subtitle: item.code,
      icon: "case",
      stats: [
        { label: "tasks", number: item.tasks.length },
        { label: "members", number: item.users.length },
      ]
    };
  }
}
