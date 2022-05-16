import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Burger} from "../../../../shared/models/burger";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BurgerService} from "../../../../shared/services/burger.service";
import {ToastrService} from "ngx-toastr";

@Component({
   selector: 'app-burger-form',
   templateUrl: './burger-form.component.html',
   styleUrls: ['./burger-form.component.scss']
})
export class BurgerFormComponent implements OnInit {

   burgerForm: any;
   formulaireTitle = 'Ajouter un burger';
   submitMessage = 'Ajouter';
   constructor(
      private toastrService: ToastrService,
      private burgerService: BurgerService,
      public dialogRef: MatDialogRef<Burger>,
      @Inject(MAT_DIALOG_DATA) public productDataEdit: Burger,
   ) { }

   ngOnInit(): void {
      this.burgerForm = new FormGroup({
         name : new FormControl('maman', [Validators.required,Validators.minLength(4)]),
         price : new FormControl('', [Validators.required,Validators.min(1)]),
         description : new FormControl('', [Validators.required,Validators.minLength(1)]),
         cook_time : new FormControl('', [Validators.required,Validators.min(1)]),
      });
      if (this.productDataEdit) {
         this.burgerForm.patchValue(this.productDataEdit);
         this.formulaireTitle = 'Modifier un burger';
         this.submitMessage = 'Modifier';
      }
   }


   burgerFormSubmit() {
      let burger = this.burgerForm.value as Burger;
      if(this.productDataEdit){
         burger.id = this.productDataEdit.id;
         this.burgerService.updateBurger(burger).subscribe(
            (data) => {
               this.toastrService.success('Burger modifié avec succès', 'Succès');
               this.dialogRef.close(data);
            },
            (error) => {
               this.toastrService.error('Erreur lors de la modification du burger', 'Erreur');
            }
         );
      }else{
         this.burgerService.createBurger(burger).subscribe(
            (data) => {
               this.dialogRef.close(data);
               this.toastrService.success('Burger ajouté avec succès', 'Succès');
            },
            (error) => {
               this.toastrService.error('Erreur lors de l\'ajout du burger', 'Erreur');
               console.log(error);
            }
         );
      }
   }

}
