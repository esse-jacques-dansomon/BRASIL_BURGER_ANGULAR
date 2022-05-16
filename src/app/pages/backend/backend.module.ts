import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BurgerFormComponent } from './burger/burger-form/burger-form.component';
import { BurgerListComponent } from './burger/burger-list/burger-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "./menu/menu.module";
import {BurgerModule} from "./burger/burger.module";
import {ComplementModule} from "./complement/complement.module";
import {TypeComplementModule} from "./type-complement/type-complement.module";
import {OrderModule} from "./order/order.module";
import {PayementModule} from "./payement/payement.module";
import {UserModule} from "./user/user.module";

@NgModule({
  declarations: [
    DashboardComponent,
  ],
   imports: [
      CommonModule,
      NgxPaginationModule,
      MatDialogModule,
      MatButtonModule,
      ReactiveFormsModule,
      MenuModule,
      BurgerModule,
      ComplementModule,
      TypeComplementModule,
      OrderModule,
      PayementModule,
      UserModule
   ]
})
export class BackendModule { }
