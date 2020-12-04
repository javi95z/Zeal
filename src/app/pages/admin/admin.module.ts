import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./admin-routing";
import {
  SidebarComponent,
  NavbarComponent,
  ProjectsAdminComponent,
  ProjectProfileAdminComponent,
  UsersAdminComponent,
  UserProfileAdminComponent,
  TasksAdminComponent,
} from "./";
import { AdminComponent } from "./admin.component";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    ProjectsAdminComponent,
    ProjectProfileAdminComponent,
    UsersAdminComponent,
    UserProfileAdminComponent,
    TasksAdminComponent,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
