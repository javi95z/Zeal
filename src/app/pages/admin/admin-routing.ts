import { Routes } from "@angular/router";
import { AdminGuard, AuthGuard } from "@guards";
import { AdminComponent } from "./admin.component";
import { ProfileComponent, UsersAdminComponent } from "./users";
import { ProjectsComponent } from "./projects";

export const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "users", component: UsersAdminComponent },
      { path: "users/profile/:id", component: ProfileComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "**", redirectTo: "/admin/users" }
    ]
  }
];
