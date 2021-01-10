import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentModule } from "@pages/content/content.module";
import { AdminModule } from "@pages/admin/admin.module";
import { AuthModule } from "@pages/auth/auth.module";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => AuthModule,
  },
  {
    path: "content",
    loadChildren: () => ContentModule,
  },
  {
    path: "admin",
    loadChildren: () => AdminModule,
  },
  { path: "", redirectTo: "content/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "content/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
