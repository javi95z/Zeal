import { NgModule } from "@angular/core";
import {
  ProjectsAdminComponent,
  ProjectProfileAdminComponent,
  EditProjectDialog
} from "./";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [
    ProjectsAdminComponent,
    ProjectProfileAdminComponent,
    EditProjectDialog
  ],
  imports: [CoreModule],
  entryComponents: [EditProjectDialog]
})
export class ProjectsAdminModule {}
