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
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  PanelHeaderComponent,
  ToastMessageComponent
} from "./components";
import {
  AvatarDirective,
  GenderDirective,
  PanelButtonDirective,
  PriorityDirective,
  StatusDirective
} from "./directives";
import { CapitalizePipe } from "@pipes";
import { MaterialModule } from "@zeal/material.module";

const components = [
  ActionsMenuComponent,
  AvatarDirective,
  BackButtonComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  EditDialogComponent,
  FormErrorsComponent,
  GenderDirective,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  PanelButtonDirective,
  PanelHeaderComponent,
  PriorityDirective,
  StatusDirective,
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
