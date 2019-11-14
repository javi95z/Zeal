import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./";
import { SharedModule } from "@pages/shared/shared.module";
import { ProjectStatusDirective } from "@directives";

@NgModule({
  declarations: [ProjectsComponent, ProjectStatusDirective],
  imports: [SharedModule]
})
export class ProjectsAdminModule {}
