import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ConfirmationDialogComponent,
  GenderIconComponent,
  LoadingComponent,
  ToastMessageComponent
} from "./";
import { CapitalizePipe } from "../../pipes";
import { MaterialModule } from "../../material.module";
import { TablesSharedModule } from "./tables/tables-shared.module";

const components = [
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
  RouterModule,
  TablesSharedModule
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [components, modules],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
