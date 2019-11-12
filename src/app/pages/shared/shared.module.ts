import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  ActionTableMenuComponent,
  ConfirmationDialogComponent,
  GenderIconComponent,
  LoadingComponent,
  ToastMessageComponent
} from "./";
import { CapitalizePipe } from "../../pipes";
import { MaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const components = [
  ActionTableMenuComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  GenderIconComponent,
  LoadingComponent,
  ToastMessageComponent
];

const modules = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [components, modules],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
