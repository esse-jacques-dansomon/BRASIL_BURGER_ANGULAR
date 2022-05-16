import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendLayoutRoutingModule } from './backend-layout-routing.module';
import { BackendLayoutComponent } from './backend-layout.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";


@NgModule({
   declarations: [
      BackendLayoutComponent,
      FooterComponent,
      SidebarMenuComponent,
      NavbarComponent
   ],
   imports: [
      CommonModule,
      BackendLayoutRoutingModule,
      MatDialogModule,
   ]
})
export class BackendLayoutModule { }
