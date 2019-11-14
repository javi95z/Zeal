import { NgModule } from "@angular/core";
import { ProjectsAdminComponent, ProjectProfileAdminComponent } from "./";
import { SharedModule } from "@pages/shared/shared.module";
import { ProjectStatusDirective } from "@directives";

@NgModule({
  declarations: [
    ProjectsAdminComponent,
    ProjectStatusDirective,
    ProjectProfileAdminComponent
  ],
  imports: [SharedModule]
})
export class ProjectsAdminModule {}
