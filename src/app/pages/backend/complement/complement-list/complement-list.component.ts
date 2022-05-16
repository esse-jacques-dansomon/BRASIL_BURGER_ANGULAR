import { Component, OnInit } from '@angular/core';
import {ComplementService} from "../../../../shared/services/complement.service";
import {ProductImageComponent} from "../../../../components/product-image/product-image.component";
import {MatDialog} from "@angular/material/dialog";
import {Complement} from "../../../../shared/models/complement";
import {ToastrService} from "ngx-toastr";
import {ComplementFormComponent} from "../complement-form/complement-form.component";
import {tap} from "rxjs";
import {Product} from "../../../../shared/models/product";
import {ImageService} from "../../../../shared/services/image.service";

@Component({
  selector: 'app-complement-list',
  templateUrl: './complement-list.component.html',
  styleUrls: ['./complement-list.component.scss']
})
export class ComplementListComponent  {

   currentPage = 1;
   complements$ = this.complementService.getComplements();
   constructor(
      private complementService : ComplementService,
      private toastrService: ToastrService,
      public dialog: MatDialog,
      private imageService: ImageService

   ) { }

   openDialog(  ): void {

      const dialogRef = this.dialog.open(ComplementFormComponent, {
         width: '485px',
         height: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
         this.complements$ = this.complementService.getComplements();
      });

   }

   openEditDialog(complement: Complement) {
      const dialogRef = this.dialog.open(ComplementFormComponent, {
         width: '485px',
         height: '500px',
         data:  complement
      });

      dialogRef.afterClosed().subscribe(() => {
         console.log('The dialog was closed');
         this.complements$ = this.complementService.getComplements();
      });
   }

   editImageProduct(complement: any) {
      const dialogRef = this.dialog.open(ProductImageComponent, {
         width: '4500',
         height: '100',
         data:  complement
      });
      dialogRef.afterClosed().subscribe(() => {
         this.complements$ = this.complementService.getComplements();
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
      this.imageService.updateStatusProduct(product).subscribe(
         () => {
            this.toastrService.success('Menu mise a été bien ajourné ');
            this.complements$= this.complementService.getComplements();
         },
         ()=>{
            this.toastrService.error('Menu lors de la mise à jour');
         }
      );
   }


}
