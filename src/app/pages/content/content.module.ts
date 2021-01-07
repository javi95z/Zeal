import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./content-routing";
import {
  DashboardComponent,
  ProjectsComponent,
  ProjectProfile,
  TasksComponent,
} from "./";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    ProjectProfile,
    TasksComponent,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class ContentModule {}
