import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  BackButtonComponent,
  ConfirmationDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  ProjectPriorityComponent,
  ToastMessageComponent
} from "./";
import { CapitalizePipe } from "@pipes";
import { MaterialModule } from "@zeal/material.module";
import { TablesSharedModule } from "./tables/tables-shared.module";

const components = [
  BackButtonComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  ProjectPriorityComponent,
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
