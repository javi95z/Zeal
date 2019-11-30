import { NgModule } from "@angular/core";
import {
  UsersAdminComponent,
  UserProfileAdminComponent,
  EditUserDialog
} from "./";
import { CoreModule } from "@core/core.module";

@NgModule({
  declarations: [
    UsersAdminComponent,
    UserProfileAdminComponent,
    EditUserDialog
  ],
  imports: [CoreModule],
  entryComponents: [EditUserDialog]
})
export class UsersAdminModule {}
