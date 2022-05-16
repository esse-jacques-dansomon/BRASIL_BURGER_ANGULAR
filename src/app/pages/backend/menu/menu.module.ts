import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [
    MenuFormComponent,
    MenuListComponent
  ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        MatDialogModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        MatSlideToggleModule
    ]
})
export class MenuModule { }
