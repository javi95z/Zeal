import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./admin-routing";
import { SidebarComponent, NavbarComponent } from "./";
import { AdminComponent } from "./admin.component";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";
import { ProjectsAdminModule, UsersAdminModule } from "./";

@NgModule({
  declarations: [AdminComponent, SidebarComponent, NavbarComponent],
  imports: [
    LayoutModule,
    CoreModule,
    ProjectsAdminModule,
    UsersAdminModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {}
