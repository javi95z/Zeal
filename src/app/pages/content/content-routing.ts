import { Routes } from "@angular/router";
import { AuthGuard } from "@guards";
import { ContentComponent } from "@pages/layout";
import { DashboardComponent, ProjectComponent } from "./";

export const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "projects/profile/:id", component: ProjectComponent },
      { path: "**", redirectTo: "/content/dashboard" },
    ],
  },
];
