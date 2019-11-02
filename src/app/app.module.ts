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

// Services
import { ToastService } from "./services";

// Modules
import { SharedModule } from "./pages/layout/shared.module";
import { AdminModule } from "./pages/admin/admin.module";
import { LoginModule } from "./pages/auth/login.module";

const httpProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestInterceptor,
  multi: true
};

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
  providers: [httpProvider, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
