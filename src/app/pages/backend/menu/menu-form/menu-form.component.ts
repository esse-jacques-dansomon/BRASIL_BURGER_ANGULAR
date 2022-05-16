import {Component, Inject, OnInit} from '@angular/core';
import {MenuService} from "../../../../shared/services/menu.service";
import {ComplementService} from "../../../../shared/services/complement.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BurgerService} from "../../../../shared/services/burger.service";
import {Menu} from "../../../../shared/models/menu";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {Complement} from "../../../../shared/models/complement";

@Component({
   selector: 'app-menu-form',
   templateUrl: './menu-form.component.html',
   styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
   formulaireTitle = 'Ajouter un menu';
   menuForm: any;
   submitMessage = 'Enregistrer';
   complements$ = this.complementService.getComplements();
   burgers$ = this.burgerService.getBurgers();

   constructor(
      private toastrService: ToastrService,
      private complementService: ComplementService,
      private burgerService: BurgerService,
      private menuService: MenuService,
      public dialogRef: MatDialogRef<Menu>,
      @Inject(MAT_DIALOG_DATA) public productDataEdit: Menu,

   ) { }
   dropdownList : Complement[] = [];
   selectedItems : Complement[] = [];
   dropdownSettings = {};
   ngOnInit(): void {
      this.complements$.forEach(complements =>   this.dropdownList = complements);
      this.dropdownSettings = {
         singleSelection: false,
         idField: 'id',
         textField: 'name',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
         itemsShowLimit: 3,
         allowSearchFilter: true
      };
      this.menuForm = new FormGroup({
         name : new FormControl('', [Validators.required,Validators.minLength(4)]),
         description : new FormControl('', [Validators.required,Validators.minLength(10)]),
         cook_time : new FormControl('', [Validators.required,Validators.minLength(2)]),
         burger_id : new FormControl('', [Validators.required,Validators.min(1)]),
         complements : new FormControl('', [Validators.required,Validators.min(1)]),
      });
      if (this.productDataEdit) {
         this.menuForm.patchValue(this.productDataEdit);
         this.menuForm.controls['burger_id'].setValue(this.productDataEdit.burger_id)
         this.menuForm.controls['list_complement_id'].setValue(this.productDataEdit.list_complements_id)
         this.formulaireTitle = `Modifier le complément ${this.productDataEdit.name}`;
         this.submitMessage = 'Modifier';
         this.selectedItems = this.productDataEdit.complements;
      }
      this.dropdownSettings = {
         singleSelection: false,
         idField: 'id',
         textField: 'name',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
         itemsShowLimit: 3,
         allowSearchFilter: true
      };
   }
   onItemSelect(item: any) {
      console.log(item);
   }
   onSelectAll(items: any) {
      console.log(items);
   }


   menuFormSubmit() {
      let menu = this.menuForm.value as Menu;
      if(this.productDataEdit){
         menu.id = this.productDataEdit.id;
         this.menuService.updateMenu(menu).subscribe(
            (data) => {
               this.toastrService.success('Menu modifié avec succès', 'Success');
               this.dialogRef.close(data);
            },
            (error) => {
               this.toastrService.error('Erreur lors de la modification du Menu', 'Erreur');
            }
         );
      }else{
         this.menuService.createMenu(menu).subscribe(
            (data) => {
               this.dialogRef.close(data);
               this.toastrService.success('Menu ajouté avec Success', 'Success');
            },
            (error) => {
               console.log(error.error.message);
               this.dialogRef.close();
               this.toastrService.error('Erreur lors de la création du Menu', 'Erreur');
            }
         );
      }
   }
}
