import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BackendLayoutComponent} from "./layouts/backend-layout/backend-layout.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {IsAdminGuard} from "./shared/guards/is-admin.guard";

const routes: Routes = [

   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
   },
   {
      path: '',
      canActivate: [IsAdminGuard],
      component: BackendLayoutComponent,
      children:[
         {
            path: '',
            loadChildren: () => import('./layouts/backend-layout/backend-layout.module').then(m => m.BackendLayoutModule)
         },
      ]
   },
   {
      path: 'login',
      component: LoginComponent,
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
