import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ActionsMenuComponent,
  BackButtonComponent,
  ColorComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  HeaderComponent,
  LabelComponent,
  LoadingComponent,
  NoResultsComponent,
  PanelHeaderComponent,
  ToastMessageComponent,
  UserIconsComponent,
} from "./components";
import {
  AvatarDirective,
  ExpiredDateDirective,
  GenderDirective,
  HeaderButtonDirective,
  OverflowDirective,
  PanelButtonDirective,
  PriorityDirective,
  StatusDirective,
} from "./directives";
import {
  ProfileBoxComponent,
  ProjectListWidget,
  TaskListWidget,
  TeamListWidget,
} from "./widgets";
import { CapitalizePipe } from "./pipes";
import { MaterialModule } from "@zeal/material.module";

const components = [
  ActionsMenuComponent,
  AvatarDirective,
  BackButtonComponent,
  CapitalizePipe,
  ColorComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  ExpiredDateDirective,
  GenderDirective,
  HeaderButtonDirective,
  HeaderComponent,
  LabelComponent,
  LoadingComponent,
  NoResultsComponent,
  OverflowDirective,
  PanelButtonDirective,
  PanelHeaderComponent,
  PriorityDirective,
  StatusDirective,
  ToastMessageComponent,
  UserIconsComponent,
];
const widgets = [
  ProfileBoxComponent,
  ProjectListWidget,
  TaskListWidget,
  TeamListWidget,
];
const modules = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [
    components,
    widgets,
    ColorComponent,
    LabelComponent,
    ProfileBoxComponent,
  ],
  imports: modules,
  exports: [modules, components, widgets, LabelComponent, ProfileBoxComponent],
  entryComponents: [ConfirmationDialogComponent, EditDialogComponent],
})
export class CoreModule {}
