import { NgModule } from "@angular/core";
import {
  ProjectsAdminComponent,
  ProjectProfileAdminComponent,
  EditProjectDialog
} from "./";
import { SharedModule } from "@pages/shared/shared.module";
import { ProjectStatusDirective } from "@directives";

@NgModule({
  declarations: [
    ProjectsAdminComponent,
    ProjectStatusDirective,
    ProjectProfileAdminComponent,
    EditProjectDialog
  ],
  imports: [SharedModule],
  entryComponents: [EditProjectDialog]
})
export class ProjectsAdminModule {}
