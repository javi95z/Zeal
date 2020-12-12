import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./admin-routing";
import {
  SidebarAdmin,
  NavbarAdmin,
  ProjectsAdmin,
  ProjectProfileAdmin,
  UsersAdmin,
  UserProfileAdmin,
  TasksAdmin,
  TaskProfileAdmin,
  TeamsAdmin,
  TeamProfileAdmin,
} from "./";
import { AdminComponent } from "./admin.component";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [
    AdminComponent,
    SidebarAdmin,
    NavbarAdmin,
    ProjectsAdmin,
    ProjectProfileAdmin,
    UsersAdmin,
    UserProfileAdmin,
    TasksAdmin,
    TaskProfileAdmin,
    TeamsAdmin,
    TeamProfileAdmin,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
