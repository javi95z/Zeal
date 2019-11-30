import { NgModule } from "@angular/core";
import {
  ProjectsAdminComponent,
  ProjectProfileAdminComponent,
  EditProjectDialog
} from "./";
import { CoreModule } from "@core/core.module";
import { ProjectStatusDirective } from "@directives";

@NgModule({
  declarations: [
    ProjectsAdminComponent,
    ProjectStatusDirective,
    ProjectProfileAdminComponent,
    EditProjectDialog
  ],
  imports: [CoreModule],
  entryComponents: [EditProjectDialog]
})
export class ProjectsAdminModule {}
