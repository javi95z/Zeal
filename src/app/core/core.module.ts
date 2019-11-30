import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsCoreModule } from "./components/components.core.module";

const modules = [
  CommonModule,
  FormsModule,
  ComponentsCoreModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class CoreModule {}
