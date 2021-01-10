import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent, SignupComponent } from "./";

export const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "**", redirectTo: "/auth/login" },
    ],
  },
];
