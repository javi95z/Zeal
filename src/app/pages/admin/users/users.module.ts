import { NgModule } from "@angular/core";
import { UsersAdminComponent, UserProfileAdminComponent } from "./";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [UsersAdminComponent, UserProfileAdminComponent],
  imports: [CoreModule]
})
export class UsersAdminModule {}
