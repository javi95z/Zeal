import { NgModule } from "@angular/core";
import { UsersAdminComponent, ProfileComponent, EditUserDialog } from "./";
import { SharedModule } from "@pages/shared/shared.module";

@NgModule({
  declarations: [UsersAdminComponent, ProfileComponent, EditUserDialog],
  imports: [SharedModule],
  entryComponents: [EditUserDialog]
})
export class UsersAdminModule {}
