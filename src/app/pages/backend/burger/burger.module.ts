import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BurgerFormComponent} from "./burger-form/burger-form.component";
import {BurgerListComponent} from "./burger-list/burger-list.component";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
   declarations: [
      BurgerFormComponent,
      BurgerListComponent
   ],
   imports: [
      CommonModule,
      NgxPaginationModule,
      MatDialogModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
   ]
})
export class BurgerModule { }
