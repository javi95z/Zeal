import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EditUserDialog, ProfileComponent, ProjectsComponent, SidebarComponent, UsersAdminComponent} from "./";
import {GenderIconComponent, LoadingComponent} from "../shared";
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../layout/shared.module";
import {MaterialModule} from "../../material.module";
import {routes} from "./admin-routing";

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    UsersAdminComponent,
    GenderIconComponent,
    LoadingComponent,
    ProfileComponent,
    EditUserDialog,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  entryComponents: [EditUserDialog]
})
export class AdminModule {
}
