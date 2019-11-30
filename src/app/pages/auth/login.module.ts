import { NgModule } from "@angular/core";
import { LoginComponent, AuthHeaderComponent } from "./";
import { LayoutModule } from "@pages/layout/layout.module";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [LoginComponent, AuthHeaderComponent],
  imports: [LayoutModule, CoreModule]
})
export class LoginModule {}
