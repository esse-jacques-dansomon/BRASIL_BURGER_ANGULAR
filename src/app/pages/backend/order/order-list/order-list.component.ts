import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../../shared/services/order.service";
import * as moment from "moment/moment";
import {map} from "rxjs";
import {Order} from "../../../../shared/models/order";
import {Complement} from "../../../../shared/models/complement";
import {ComplementFormComponent} from "../../complement/complement-form/complement-form.component";
import {PaymentFormComponent} from "../payment-form/payment-form.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailsComponent} from "../order-details/order-details.component";

@Component({
   selector: 'app-order-list',
   templateUrl: './order-list.component.html',
   styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent  {
   currentPage = 1;
   orders$ = this.orderService.getAll();
   status$ = ['All', 'En cours', 'Annuler', 'Terminer'];
   searchValue: any;
   statusSearched: any;
   startDate: string | undefined;
   endDate: string | undefined;
   nomClientSearch: any;
   constructor(
      private orderService: OrderService,
      private toastr: ToastrService,
      public dialog: MatDialog,

   ) {this.orders$ = this.orderService.getAll()}

   searchValueChanged() {
      if (this.searchValue.length > 3) {
         this.orders$ = this.orderService.filterByProductType(this.searchValue);
      }else{
         this.orders$ = this.orderService.getAll();
      }
   }

   filterOrderByStatus() {
      if (this.statusSearched ===  "All") {
         this.orders$ = this.orderService.getAll();
      }else{
         this.orders$ = this.orderService.filterByStatus(this.statusSearched);
      }
   }

   filterOrderBetweenDate() {
      let s = moment(this.startDate).format('yyyy-M-D');
      let d = moment(this.endDate).format('yyyy-M-D');
      if(this.startDate && this.endDate){
         this.orders$ = this.orderService.filterByBetweenDates( s.toString(), d.toString());
      }
   }

   searchClientValueChanged() {
      if (this.nomClientSearch.length > 2) {
        this.orders$ = this.orders$.pipe(
            map(orders => orders.filter(order => order.client.username.toLowerCase().includes(this.nomClientSearch.toLowerCase())))
         )
      }
      else {
         this.orders$ = this.orderService.getAll();
      }
   }

   changeOrderStatus(status: string, order : Order) {
      if (status === "Recu" && !order.payment.is_paid) {
         alert("Veuillez payer votre commande avant de la terminer");
         order.status = "Recu";
         this.openEditDialog(order);
      }else{
         this.setOrderSataus(status, order);
      }
   }

   setOrderSataus(status : string, order: Order){
      order.status = status;
      this.orderService.update(order).subscribe(
         () => {
            this.toastr.success('Status modifié avec succès');
            this.orders$ = this.orderService.getAll();
         },
         () => {
            this.toastr.error('Erreur lors de la modification du status');
         }
      );
   }


   openEditDialog(order: Order) {
      const dialogRef = this.dialog.open(PaymentFormComponent, {
         width: '485px',
         height: '100',
         data:  order
      });
      dialogRef.afterClosed().subscribe(() => {
         console.log('The dialog was closed');
      });
   }

   openOrderDetailsDialog(order: Order) {
      const dialogRef = this.dialog.open(OrderDetailsComponent, {
         width: '485px',
         height: '500',
         data:  order
      });
      dialogRef.afterClosed().subscribe(() => {
         console.log('The dialog was closed');
      });
   }
}
