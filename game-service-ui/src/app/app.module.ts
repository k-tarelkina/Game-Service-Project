import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { MainMenuComponent } from './core/components/main-menu/main-menu.component';
import { HeaderComponent } from './core/components/header/header.component';
import {SharedModule} from "./shared/shared.module";
import {RouterModule} from "@angular/router";
import {httpInterceptorProviders} from "./interceptors/http_interceptors";
import {AuthModule} from "./features/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        AuthModule
    ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
