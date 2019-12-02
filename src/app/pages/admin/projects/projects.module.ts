import { NgModule } from "@angular/core";
import { ProjectsAdminComponent, ProjectProfileAdminComponent } from "./";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [ProjectsAdminComponent, ProjectProfileAdminComponent],
  imports: [CoreModule]
})
export class ProjectsAdminModule {}
