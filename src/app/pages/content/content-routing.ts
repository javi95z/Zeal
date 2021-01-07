import { Routes } from "@angular/router";
import { AuthGuard } from "@guards";
import { ContentComponent } from "@pages/layout";
import {
  DashboardComponent,
  ProjectsComponent,
  ProjectProfile,
  TasksComponent,
} from "./";

export const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "tasks", component: TasksComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "projects/profile/:id", component: ProjectProfile },
      { path: "**", redirectTo: "/content/dashboard" },
    ],
  },
];
