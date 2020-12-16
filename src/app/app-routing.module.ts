import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "@pages/auth/login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "content",
    loadChildren: "./pages/content/content.module#ContentModule",
  },
  {
    path: "admin",
    loadChildren: "./pages/admin/admin.module#AdminModule",
  },
  { path: "", redirectTo: "content/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "content/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
