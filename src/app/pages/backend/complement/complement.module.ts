import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplementListComponent } from './complement-list/complement-list.component';
import { ComplementFormComponent } from './complement-form/complement-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    ComplementListComponent,
    ComplementFormComponent
  ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSlideToggleModule
    ]
})
export class ComplementModule { }
