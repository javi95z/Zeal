import { Routes } from "@angular/router";
import { AdminGuard, AuthGuard } from "@guards";
import { AdminComponent } from "./admin.component";
import {
  UserProfileAdmin,
  UsersAdmin,
  ProjectProfileAdmin,
  ProjectsAdmin,
  TasksAdmin,
  TaskProfileAdmin,
  TeamsAdmin,
  TeamProfileAdmin
} from "./";

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
      { path: "tasks/profile/:id", component: TaskProfileAdmin },
      { path: "teams", component: TeamsAdmin },
      { path: "teams/profile/:id", component: TeamProfileAdmin },
      { path: "**", redirectTo: "/admin/users" },
    ],
  },
];
