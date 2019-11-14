import { NgModule } from "@angular/core";
import { LoginComponent, AuthHeaderComponent } from "./";
import { LayoutModule } from "@pages/layout/layout.module";
import { SharedModule } from "@pages/shared/shared.module";

@NgModule({
  declarations: [LoginComponent, AuthHeaderComponent],
  imports: [LayoutModule, SharedModule]
})
export class LoginModule {}
