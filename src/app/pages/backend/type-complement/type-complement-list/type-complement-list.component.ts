import { Component, OnInit } from '@angular/core';
import {TypeComplementService} from "../../../../shared/services/type-complement.service";
import {BurgerFormComponent} from "../../burger/burger-form/burger-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TypeComplementFormComponent} from "../type-complement-form/type-complement-form.component";
import {Burger} from "../../../../shared/models/burger";
import {TypeComplement} from "../../../../shared/models/TypeComplement";
import {ProductImageComponent} from "../../../../components/product-image/product-image.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-type-complement-list',
  templateUrl: './type-complement-list.component.html',
  styleUrls: ['./type-complement-list.component.scss']
})
export class TypeComplementListComponent  {

   currentPage = 1;
   typeComplements$ = this.typeComplementService.getAll();
   constructor(
      private typeComplementService : TypeComplementService,
      public dialog: MatDialog,
      private toastr: ToastrService

   ) { }

   openCreateDialog() {
      const dialogRef = this.dialog.open(TypeComplementFormComponent, {
         width: '485px',
         height: '450',
      });

      dialogRef.afterClosed().subscribe(() => {
         this.typeComplements$ = this.typeComplementService.getAll();
      });
   }


   openEditDialog(typeComplement:TypeComplement ) {
      const dialogRef = this.dialog.open(TypeComplementFormComponent, {
         width: '485px',
         height: '300',
         data:  typeComplement
      });

      dialogRef.afterClosed().subscribe(() => {
         this.typeComplements$ = this.typeComplementService.getAll();
      });
   }

   editImageProduct(burger: any) {
      const dialogRef = this.dialog.open(ProductImageComponent, {
         width: '4500',
         height: '100',
         data:  burger
      });
      dialogRef.afterClosed().subscribe(() => {
         this.typeComplements$ = this.typeComplementService.getAll();
         this.toastr.success('Image updated successfully');
      });
   }
}
