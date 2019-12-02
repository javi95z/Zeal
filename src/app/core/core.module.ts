import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ActionsMenuComponent,
  BackButtonComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  ToastMessageComponent
} from "./components";
import { PriorityDirective, ProjectStatusDirective } from "./directives";
import { CapitalizePipe } from "@pipes";
import { MaterialModule } from "@zeal/material.module";

const components = [
  ActionsMenuComponent,
  BackButtonComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  EditDialogComponent,
  FormErrorsComponent,
  GenderIconComponent,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  PriorityDirective,
  ProjectStatusDirective,
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
  exports: [modules, components],
  entryComponents: [ConfirmationDialogComponent, EditDialogComponent]
})
export class CoreModule {}
