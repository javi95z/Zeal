import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [ProjectsComponent],
  imports: [SharedModule]
})
export class ProjectsAdminModule {}
