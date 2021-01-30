import { Routes } from "@angular/router";
import { AuthGuard } from "@guards";
import { ContentComponent } from "@pages/layout";
import {
  DashboardComponent,
  ProjectsComponent,
  ProjectProfile,
  TasksComponent,
  TaskProfile,
  TeamsComponent,
} from "./";

export const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "tasks", component: TasksComponent },
      { path: "tasks/profile/:id", component: TaskProfile },
      { path: "projects", component: ProjectsComponent },
      { path: "projects/profile/:id", component: ProjectProfile },
      { path: "teams", component: TeamsComponent },
      // { path: "teams/profile/:id", component: TeamProfile },
      { path: "**", redirectTo: "/content/dashboard" },
    ],
  },
];
