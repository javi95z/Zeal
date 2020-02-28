import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RequestInterceptor } from "@guards";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { DashboardComponent } from "@pages/dashboard/dashboard.component";

// Services
import { ToastService } from "@services";

// Modules
import { CoreModule } from "@core/core.module";
import { LayoutModule } from "@pages/layout/layout.module";
import { AdminModule } from "@pages/admin/admin.module";
import { LoginModule } from "@pages/auth/login.module";

// Locales
import localeEs from "@angular/common/locales/es";
import localeFr from "@angular/common/locales/fr";
registerLocaleData(localeEs, "es");
registerLocaleData(localeFr, "fr");

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
    LayoutModule,
    CoreModule,
    AppRoutingModule,
    AdminModule,
    LoginModule
  ],
  providers: [httpProvider, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
