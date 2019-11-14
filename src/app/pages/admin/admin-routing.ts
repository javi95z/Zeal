import { Routes } from "@angular/router";
import { AdminGuard, AuthGuard } from "@guards";
import { AdminComponent } from "./admin.component";
import { UserProfileAdminComponent, UsersAdminComponent } from "./users";
import { ProjectProfileAdminComponent, ProjectsAdminComponent } from "./projects";

export const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "users", component: UsersAdminComponent },
      { path: "users/profile/:id", component: UserProfileAdminComponent },
      { path: "projects", component: ProjectsAdminComponent },
      { path: "projects/profile/:id", component: ProjectProfileAdminComponent },
      { path: "**", redirectTo: "/admin/users" }
    ]
  }
];
