import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./content-routing";
import {
  DashboardComponent,
  ProjectsComponent,
  ProjectProfile,
  ReportsComponent,
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
    ReportsComponent,
    TasksComponent,
    TaskProfile,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class ContentModule {}
