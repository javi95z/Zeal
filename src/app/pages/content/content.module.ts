import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./content-routing";
import { DashboardComponent, ProjectComponent, TasksComponent } from "./";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [DashboardComponent, ProjectComponent, TasksComponent],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class ContentModule {}
