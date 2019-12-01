import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsCoreModule } from "./components/components.core.module";
import { DirectivesCoreModule } from "@directives/directives.core.module";

const modules = [
  CommonModule,
  FormsModule,
  ComponentsCoreModule,
  DirectivesCoreModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class CoreModule {}
