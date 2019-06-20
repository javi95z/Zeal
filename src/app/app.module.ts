import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// Components
import { NavbarComponent } from './pages/layout/navbar/navbar.component';
import { SidebarComponent } from './pages/layout/sidebar/sidebar.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { ContentComponent } from './pages/layout/content/content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersAdminComponent } from './pages/admin/users/users.component';

// Modules
import { LoginModule } from './pages/auth/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    DashboardComponent,
    UsersAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
