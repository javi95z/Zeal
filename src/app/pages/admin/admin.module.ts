import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./admin-routing";
import { SidebarComponent } from "./";
import { AdminComponent } from "./admin.component";
import { SharedModule } from "../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { ProjectsAdminModule, UsersAdminModule } from "./";

@NgModule({
  declarations: [AdminComponent, SidebarComponent],
  imports: [
    LayoutModule,
    SharedModule,
    ProjectsAdminModule,
    UsersAdminModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {}
