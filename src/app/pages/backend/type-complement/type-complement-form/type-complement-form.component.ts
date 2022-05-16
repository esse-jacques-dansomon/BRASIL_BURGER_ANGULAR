import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeComplementService} from "../../../../shared/services/type-complement.service";
import {TypeComplement} from "../../../../shared/models/TypeComplement";

@Component({
  selector: 'app-type-complement-form',
  templateUrl: './type-complement-form.component.html',
  styleUrls: ['./type-complement-form.component.scss']
})
export class TypeComplementFormComponent implements OnInit {
   typeComplementForm: any;
   fb = new FormData(  );

  constructor(
     private toastrService: ToastrService,
     private typeComplementService: TypeComplementService,
     public dialogRef: MatDialogRef<TypeComplement>,
     @Inject(MAT_DIALOG_DATA) public productDataEdit: TypeComplement,
  ) { }

  ngOnInit(): void {
     this.typeComplementForm = new FormGroup({
        name : new FormControl('', [Validators.required,Validators.minLength(4)]),
        description : new FormControl('', [Validators.required,Validators.minLength(0)]),
     })
     if(this.productDataEdit){
        this.typeComplementForm.patchValue(this.productDataEdit)
     }
  }

   onNoClick() {
      this.typeComplementForm.reset();
   }

   onFormSubmit(){
      if (this.typeComplementForm.valid) {
         let typeComplement =this.typeComplementForm.value as TypeComplement;
         if (this.productDataEdit) {
            typeComplement.id = this.productDataEdit.id;
            this.typeComplementService.update(typeComplement).subscribe(
               (res) => {
                  this.toastrService.success('Type Complement Updated Successfully', 'Success');
                  this.dialogRef.close(res);
               },
               (err) => {
                  this.toastrService.error('Error Occured', 'Error');
               }
            )
         } else {
            this.typeComplementService.create(this.typeComplementForm.value as TypeComplement).subscribe(
               (res) => {
                  this.toastrService.success('Type Complement Created Successfully', 'Success');
                  this.dialogRef.close(res);
               },
               (err) => {
                  this.toastrService.error('Error Occured', 'Error');
               }
            )
         }
      }
   }


}
