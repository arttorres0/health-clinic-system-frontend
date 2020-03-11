import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingComponent } from "./loading/loading.component";
import { ToastComponent } from "./toast/toast.component";
import { ReqInterceptor } from "./req-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ToastComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
