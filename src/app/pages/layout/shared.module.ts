import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";
import { ToastMessageComponent } from "../shared";
import { CapitalizePipe } from "../../pipes/capitalize/capitalize.pipe";

const components = [
  ContentComponent,
  NavbarComponent,
  SidebarComponent,
  FooterComponent,
  ToastMessageComponent,
  CapitalizePipe
];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [...components, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
