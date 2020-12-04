import { Routes } from "@angular/router";
import { AdminGuard, AuthGuard } from "@guards";
import { AdminComponent } from "./admin.component";
import { UserProfileAdmin, UsersAdmin } from "./users";
import { ProjectProfileAdmin, ProjectsAdmin } from "./projects";
import { TasksAdmin } from "./tasks";

export const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "users", component: UsersAdmin },
      { path: "users/profile/:id", component: UserProfileAdmin },
      { path: "projects", component: ProjectsAdmin },
      { path: "projects/profile/:id", component: ProjectProfileAdmin },
      { path: "tasks", component: TasksAdmin },
      { path: "**", redirectTo: "/admin/users" },
    ],
  },
];
