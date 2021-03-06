import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ActionsMenuComponent,
  ColorComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  LabelComponent,
  LoadingComponent,
  NoResultsComponent,
  PanelHeaderComponent,
  PanelSearchComponent,
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
  PieChartWidget,
  ProfileBoxComponent,
  TextBoxComponent,
  ProgressTrackComponent,
  ProjectListWidget,
  SmallWellWidget,
  TaskListWidget,
  TeamListWidget,
  ActivityWidget,
  UserListWidget,
} from "./widgets";
import { CapitalizePipe, SingularPipe, TimeAgoPipe } from "./pipes";
import { MaterialModule } from "@zeal/material.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";

const components = [
  ActionsMenuComponent,
  AvatarDirective,
  CapitalizePipe,
  ColorComponent,
  ConfirmationDialogComponent,
  EditDialogComponent,
  ErrorMessageComponent,
  ExpiredDateDirective,
  GenderDirective,
  HeaderButtonDirective,
  LabelComponent,
  LoadingComponent,
  NoResultsComponent,
  OverflowDirective,
  PanelButtonDirective,
  PanelSearchComponent,
  PanelHeaderComponent,
  PriorityDirective,
  StatusDirective,
  ToastMessageComponent,
  UserIconsComponent,
];
const widgets = [
  PieChartWidget,
  ProgressTrackComponent,
  ProfileBoxComponent,
  TextBoxComponent,
  ProjectListWidget,
  SmallWellWidget,
  TaskListWidget,
  TeamListWidget,
  ActivityWidget,
  UserListWidget,
];
const modules = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
  NgxChartsModule,
];
const pipes = [CapitalizePipe, SingularPipe, TimeAgoPipe];

@NgModule({
  declarations: [components, widgets, pipes],
  imports: modules,
  exports: [modules, components, widgets],
  entryComponents: [ConfirmationDialogComponent, EditDialogComponent],
})
export class CoreModule {}
