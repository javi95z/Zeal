import { Component, OnInit, Injector } from "@angular/core";
import { Task, User, Project } from "@models";
import { DetailClass } from "@core/classes";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class TaskProfileAdmin extends DetailClass<Task> implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.resourceName = "tasks";
  }

  ngOnInit(): void {
    this.getResource();
    this.buildMenu(["EDIT", "LIST", "DELETE"]);
  }

  /**
   * Execute action depending on element clicked
   * @param event Named action from panel header
   */
  onAction(event: string) {
    switch (event) {
      case "LIST":
        this.router.navigate(["/admin", "tasks"]);
        break;
      case "EDIT":
        // this.editTask();
        break;
      case "DELETE":
        this.deleteResource();
        break;
    }
  }

  /**
   * Edit owner of the task
   */
  editOwner = () => this.editOneToMany<User>("user", this.resource?.user);

  /**
   * Edit project of the task
   */
  editProject = () =>
    this.editOneToMany<Project>("project", this.resource?.project);
}
