import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./pages/auth/auth.module";
import {BackendModule} from "./pages/backend/backend.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthInterceptorProvider} from "./shared/interceptor/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {BackendLayoutModule} from "./layouts/backend-layout/backend-layout.module";
import {ToastrModule} from "ngx-toastr";
import { ProductImageComponent } from './components/product-image/product-image.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
   declarations: [
      AppComponent,
      ProductImageComponent
   ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        BackendModule,
        BackendLayoutModule,
        BrowserAnimationsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
    ],
   providers: [AuthInterceptorProvider],
   bootstrap: [AppComponent]
})
export class AppModule { }
