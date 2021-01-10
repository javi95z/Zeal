import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./auth-routing";
import { AuthHeaderComponent, LoginComponent, SignupComponent } from "./";
import { AuthComponent } from "./auth.component";
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    AuthHeaderComponent,
    SignupComponent,
  ],
  imports: [LayoutModule, CoreModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
