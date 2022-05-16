import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../../../shared/services/menu.service";
import {Menu} from "../../../../shared/models/menu";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ProductImageComponent} from "../../../../components/product-image/product-image.component";
import {MenuFormComponent} from "../menu-form/menu-form.component";
import {Product} from "../../../../shared/models/product";
import {ImageService} from "../../../../shared/services/image.service";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

   currentPage = 1;
   menus$ = this.menuService.getMenus();
   constructor(
      private menuService: MenuService,
      private toastrService: ToastrService,
      public dialog: MatDialog,
      private imageService: ImageService
   ) { }
   ngOnInit(): void {
   }

   openEditDialog(menu: Menu) {

      const dialogRef = this.dialog.open(MenuFormComponent, {
         width: '485px',
         height: '550px',
         data: menu,
      });

      dialogRef.afterClosed().subscribe(() => {
         this.menus$ = this.menuService.getMenus();
      });


   }

   openCreateDialog() {
      const dialogRef = this.dialog.open(MenuFormComponent, {
         width: '485px',
         height: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
         this.menus$ = this.menuService.getMenus();
      });
   }

   editImageProduct(menu: Menu) {
      const dialogRef = this.dialog.open(ProductImageComponent, {
         width: '4500',
         height: '100',
         data:  menu
      });
      dialogRef.afterClosed().subscribe(() => {
         this.menus$ = this.menuService.getMenus();
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
            this.menus$ = this.menuService.getMenus();
         },
         ()=>{
            this.toastrService.error('Menu lors de la mise à jour');
         }
      );
   }

}
