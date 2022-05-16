import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    UserListComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class UserModule { }
