import { NgModule } from "@angular/core";
import {
  UsersAdminComponent,
  UserProfileAdminComponent,
  EditUserDialog
} from "./";
import { SharedModule } from "@pages/shared/shared.module";

@NgModule({
  declarations: [
    UsersAdminComponent,
    UserProfileAdminComponent,
    EditUserDialog
  ],
  imports: [SharedModule],
  entryComponents: [EditUserDialog]
})
export class UsersAdminModule {}
