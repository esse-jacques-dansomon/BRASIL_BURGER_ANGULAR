import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComplementService} from "../../../../shared/services/complement.service";
import {Complement} from "../../../../shared/models/complement";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeComplementService} from "../../../../shared/services/type-complement.service";

@Component({
  selector: 'app-complement-form',
  templateUrl: './complement-form.component.html',
  styleUrls: ['./complement-form.component.scss']
})
export class ComplementFormComponent implements OnInit {
   formulaireTitle = 'Ajouter un complément';
   complementForm: any;
   submitMessage= 'Enregistrer';
   type_complements$ = this.typeComplementService.getAll();

  constructor(
     private toastrService: ToastrService,
     private complementService: ComplementService,
     private typeComplementService: TypeComplementService,
     public dialogRef: MatDialogRef<Complement>,
     @Inject(MAT_DIALOG_DATA) public productDataEdit: Complement,
  ) { }


  ngOnInit(): void {
     this.complementForm = new FormGroup({
        name : new FormControl('', [Validators.required,Validators.minLength(4)]),
        price : new FormControl('', [Validators.required,Validators.min(1)]),
        description : new FormControl('', [Validators.required,Validators.minLength(1)]),
        type_id : new FormControl('', [Validators.required,Validators.min(1)]),
     });
     if (this.productDataEdit) {
        this.complementForm.patchValue(this.productDataEdit);
        this.complementForm.controls['type_id'].setValue(this.productDataEdit.type_id)
        this.formulaireTitle = `Modifier le complément ${this.productDataEdit.name}`;
        this.submitMessage = 'Modifier';
     }
  }

   complementSubmit() {
      let complement = this.complementForm.value as Complement;
      if(this.productDataEdit){
         complement.id = this.productDataEdit.id;
         this.complementService.updateComplement(complement).subscribe(
            (data) => {
               this.toastrService.success('Complement modifié avec succès', 'Succès');
               this.dialogRef.close(data);
            },
            (error) => {
               this.toastrService.error('Erreur lors de la modification du Complement', 'Erreur');
            }
         );
      }else{
         this.complementService.createComplement(complement).subscribe(
            (data) => {
               this.dialogRef.close(data);
               this.toastrService.success('Complement ajouté avec succès', 'Succès');
            },
            (error) => {
               console.log(error.error.message);
               this.dialogRef.close();
               this.toastrService.error('Erreur lors de la créaction du Complement', 'Erreur');
            }
         );
      }
   }
}
