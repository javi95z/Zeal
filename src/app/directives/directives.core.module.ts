import { NgModule } from "@angular/core";
import { PriorityDirective } from "./";

const components = [PriorityDirective];

@NgModule({
  declarations: components,
  exports: components
})
export class DirectivesCoreModule {}
