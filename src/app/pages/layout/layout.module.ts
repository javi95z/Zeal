import { NgModule } from "@angular/core";
import {
  NavbarComponent,
  SidebarComponent,
  ContentComponent,
  FooterComponent
} from "./";
import { SharedModule } from "@pages/shared/shared.module";

const components = [
  ContentComponent,
  FooterComponent,
  NavbarComponent,
  SidebarComponent
];

@NgModule({
  declarations: components,
  imports: [SharedModule],
  exports: components
})
export class LayoutModule {}
