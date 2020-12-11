import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ActionsMenuComponent,
  BackButtonComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  PanelHeaderComponent,
  ToastMessageComponent,
  UserIconsComponent
} from "./components";
import {
  AvatarDirective,
  GenderDirective,
  HeaderButtonDirective,
  OverflowDirective,
  PanelButtonDirective,
  PriorityDirective,
  StatusDirective,
} from "./directives";
import { CapitalizePipe } from "./pipes";
import { MaterialModule } from "@zeal/material.module";

const components = [
  ActionsMenuComponent,
  AvatarDirective,
  BackButtonComponent,
  CapitalizePipe,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  GenderDirective,
  HeaderButtonDirective,
  HeaderComponent,
  LoadingComponent,
  NoResultsComponent,
  OverflowDirective,
  PanelButtonDirective,
  PanelHeaderComponent,
  PriorityDirective,
  StatusDirective,
  ToastMessageComponent,
  UserIconsComponent
];

const modules = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [modules, components],
  entryComponents: [ConfirmationDialogComponent, EditDialogComponent],
})
export class CoreModule {}
