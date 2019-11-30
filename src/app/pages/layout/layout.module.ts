import { NgModule } from "@angular/core";
import {
  NavbarComponent,
  SidebarComponent,
  ContentComponent,
  FooterComponent
} from "./";
import { CoreModule } from "@core/core.module";

const components = [
  ContentComponent,
  FooterComponent,
  NavbarComponent,
  SidebarComponent
];

@NgModule({
  declarations: components,
  imports: [CoreModule],
  exports: components
})
export class LayoutModule {}
