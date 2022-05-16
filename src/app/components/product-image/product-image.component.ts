import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Burger} from "../../shared/models/burger";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../shared/services/image.service";

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
   public productForm: any;
  constructor(
     private imageService: ImageService,
     public dialogRef: MatDialogRef<Burger>,
     @Inject(MAT_DIALOG_DATA) public productDataEdit: any,
  ) { }

  ngOnInit(): void {
     this.productForm = new FormGroup(
        {
           image : new FormControl('',[Validators.required]),
        }
     )
  }

   onFileChange(event : any) {
      if (event.target.files.length > 0) {
         const file = <File>event.target.files[0];
         let fb = new FormData(  );
         fb.append('file', file, file.name);
         this.imageService.updateProductImage(this.productDataEdit.id,fb).subscribe(
            (data) => {
               console.log(data);
            },
            (error) => {
               console.log(error);
            }
         );
      }
   }


   onTypeFileChange(event : any) {
      if (event.target.files.length > 0) {
         const file = <File>event.target.files[0];
         let fb = new FormData(  );
         fb.append('file', file, file.name);
         this.imageService.updateProductImage(this.productDataEdit.id,fb).subscribe(
            (data) => {
               console.log(data);
            },
            (error) => {
               console.log(error);
            }
         );
      }
   }

}
