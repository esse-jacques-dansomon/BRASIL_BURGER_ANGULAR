import { Component } from '@angular/core';
import {BurgerService} from "../../../../shared/services/burger.service";
import {Burger} from "../../../../shared/models/burger";
import {BurgerFormComponent} from "../burger-form/burger-form.component";
import {MatDialog} from "@angular/material/dialog";
import {ProductImageComponent} from "../../../../components/product-image/product-image.component";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../../../shared/models/product";


@Component({
   selector: 'app-burger-list',
   templateUrl: './burger-list.component.html',
   styleUrls: ['./burger-list.component.scss']
})
export class BurgerListComponent  {
   burgers$;
   constructor(
      private burgerService : BurgerService,
      public dialog: MatDialog,
      private toastr: ToastrService
   ) {
   this.burgers$ = this.burgerService.getBurgers();

   }
   p: string | number = 1;

   openDialog(  ): void {
      const dialogRef = this.dialog.open(BurgerFormComponent, {
         width: '485px',
         height: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
         console.log('The dialog was closed');
         this.burgers$ = this.burgerService.getBurgers();
      });

   }
   openEditDialog(burger: Burger) {
      const dialogRef = this.dialog.open(BurgerFormComponent, {
         width: '485px',
         height: '500px',
         data:  burger
      });
      dialogRef.afterClosed().subscribe(() => {
         this.burgers$ = this.burgerService.getBurgers();
      });
   }

   editImageProduct(burger: any) {
      const dialogRef = this.dialog.open(ProductImageComponent, {
         width: '4500',
         height: '100',
         data:  burger
      });

      dialogRef.afterClosed().subscribe(() => {
         this.burgers$ = this.burgerService.getBurgers();
         this.toastr.success('Image updated successfully');
      });
   }

   updateStatusProductDialog(product : Product, status : string) {
      if (status === 'p')
         product.is_popular = !product.is_popular;
      else if (status === 'f') {
         product.is_featured = !product.is_featured;
      }
      else if (status === 'm')
         product.is_offer_of_the_day = !product.is_offer_of_the_day;
      else if (status === 'a')
         product.is_available = !product.is_available;
      this.burgerService.archiveBurger(product).subscribe(
         (data) => {
            console.log(data);
            this.toastr.success('Burger mise a été bien ajourné ');
            this.burgers$ = this.burgerService.getBurgers();
         },
         (error)=>{
            console.log(error);
            this.toastr.error('Erreur lors de la mise à jour');
         }
      );
   }

}
