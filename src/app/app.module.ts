import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/navbar/navbar.component';
import { SimpleDialogComponent } from './shared/components/simple-dialog/index.component';
import { AuthInterceptorService } from './shared/services/internal/interceptor/index.service';
import { SelectComponent } from './shared/components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SimpleDialogComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
