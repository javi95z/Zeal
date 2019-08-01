import { Routes } from "@angular/router";
import { AuthGuard, AdminGuard } from "../../guards";
import { AdminComponent } from "./admin.component";
import { UsersAdminComponent, ProfileComponent } from "./users";

export const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "users", component: UsersAdminComponent },
      { path: "users/profile/:id", component: ProfileComponent },
      { path: "**", redirectTo: "users" }
    ]
  }
];
