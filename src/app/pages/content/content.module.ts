import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./content-routing";
import {
  DashboardComponent,
  ProjectsComponent,
  ProjectProfile,
  TasksComponent,
  TaskProfile,
} from "./";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    ProjectProfile,
    TasksComponent,
    TaskProfile,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class ContentModule {}
