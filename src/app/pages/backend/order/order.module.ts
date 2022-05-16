import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { PaymentFormComponent } from './payment-form/payment-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  declarations: [
    OrderListComponent,
    PaymentFormComponent,
    OrderDetailsComponent
  ],
   imports: [
      CommonModule,
      NgxPaginationModule,
      MatFormFieldModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      ReactiveFormsModule,
   ]
})
export class OrderModule { }
