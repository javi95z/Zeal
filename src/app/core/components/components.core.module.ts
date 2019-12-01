import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ActionsMenuComponent,
  BackButtonComponent,
  ConfirmationDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  ToastMessageComponent
} from "./";
import { CapitalizePipe } from "@pipes";
import { MaterialModule } from "@zeal/material.module";

const components = [
  ActionsMenuComponent,
  BackButtonComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
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
export class ComponentsCoreModule {}
