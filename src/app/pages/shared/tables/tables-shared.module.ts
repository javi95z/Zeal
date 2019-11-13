import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ActionsMenuComponent, NoResultsComponent } from "./";

const components = [ActionsMenuComponent, NoResultsComponent];

@NgModule({
  declarations: components,
  imports: [RouterModule],
  exports: components
})
export class TablesSharedModule {}
