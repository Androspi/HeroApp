import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import localeCOLExtra from '@angular/common/locales/extra/es-CO';
import localeCOL from '@angular/common/locales/es-CO';
registerLocaleData(localeCOL, 'es-CO', localeCOLExtra);

import { SharedModule } from './components/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RestInterceptor } from './interceptors/rest.interceptor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
})
export class AppModule { }

