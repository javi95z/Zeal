import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { RequestInterceptor } from "./guards/request.interceptor";

// Components
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

// Modules
import { SharedModule } from "./pages/layout/shared.module";
import { AdminModule } from "./pages/admin/admin.module";
import { LoginModule } from "./pages/auth/login/login.module";

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    AdminModule,
    LoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
