import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "@services";
import { Project } from "@models";

@Component({
  selector: "z-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProjectProfileAdminComponent implements OnInit {
  project: Project;
  isLoading = true;

  constructor(private route: ActivatedRoute, private service: ProjectService) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.service
          .getProject(data.id)
          .then(res => (this.project = new Project(res)))
          .finally(() => {
            this.isLoading = false;
            console.log(this.project);
          });
      }
    });
  }
}
