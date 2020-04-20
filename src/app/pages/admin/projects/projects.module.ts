import { NgModule } from "@angular/core";
import {
  ProjectsAdminComponent,
  ProjectProfileAdminComponent,
  TasksComponent,
} from "./";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [
    ProjectsAdminComponent,
    ProjectProfileAdminComponent,
    TasksComponent,
  ],
  imports: [CoreModule],
})
export class ProjectsAdminModule {}
