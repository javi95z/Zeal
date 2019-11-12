import { NgModule } from "@angular/core";
import { LoginComponent, AuthHeaderComponent } from "./";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [LoginComponent, AuthHeaderComponent],
  imports: [LayoutModule, SharedModule]
})
export class LoginModule {}
