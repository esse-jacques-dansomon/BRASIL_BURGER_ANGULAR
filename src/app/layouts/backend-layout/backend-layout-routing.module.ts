import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../pages/backend/dashboard/dashboard.component";
import {BurgerListComponent} from "../../pages/backend/burger/burger-list/burger-list.component";
import {MenuListComponent} from "../../pages/backend/menu/menu-list/menu-list.component";
import {ComplementListComponent} from "../../pages/backend/complement/complement-list/complement-list.component";
import {OrderListComponent} from "../../pages/backend/order/order-list/order-list.component";
import {
   TypeComplementListComponent
} from "../../pages/backend/type-complement/type-complement-list/type-complement-list.component";
import {UserListComponent} from "../../pages/backend/user/user-list/user-list.component";

const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'burgers', component: BurgerListComponent },
   { path: 'menus', component: MenuListComponent },
   { path: 'complements', component: ComplementListComponent },
   { path: 'types-complements', component: TypeComplementListComponent },
   { path: 'orders', component: OrderListComponent },
   { path: 'payments', component: ComplementListComponent },
   { path: 'users', component: UserListComponent },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendLayoutRoutingModule { }
