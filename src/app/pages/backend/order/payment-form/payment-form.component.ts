import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../../shared/services/order.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Complement} from "../../../../shared/models/complement";
import {Order} from "../../../../shared/models/order";

@Component({
   selector: 'app-payment-form',
   templateUrl: './payment-form.component.html',
   styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
   orderForm: any;
   types  = [
      'cash',
      'wave',
      'om',
      'Free',
      'visa',
      'mastercard',
      'americanexpress',
      'discover',
      'jcb',
      'dinersclub',
      'unionpay',
      'maestro',
      'dankort',
   ]
   constructor(
      private orderService: OrderService,
      @Inject(MAT_DIALOG_DATA) public order: Order,

   ){}

   ngOnInit(): void {
      this.orderForm = new FormGroup({
         type: new FormControl('', [Validators.required])
      });
   }

   orderFormSubmit() {
      let value = this.orderForm.value['type'];
      this.orderService.updatePayement(this.order, value).subscribe(
         (order: Order) => {
            console.log(order);
         }
      );
   }
}
