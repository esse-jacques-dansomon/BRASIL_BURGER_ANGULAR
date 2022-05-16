import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComplementFormComponent } from './type-complement-form/type-complement-form.component';
import { TypeComplementListComponent } from './type-complement-list/type-complement-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    TypeComplementFormComponent,
    TypeComplementListComponent
  ],
   imports: [
      CommonModule,
      NgxPaginationModule,
      MatDialogModule,
      ReactiveFormsModule,
      MatButtonModule
   ]
})
export class TypeComplementModule { }
