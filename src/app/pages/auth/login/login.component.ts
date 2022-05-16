import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticatorService} from "../../../shared/services/authentificator.service";
import {Router} from "@angular/router";
import {User} from "../../../shared/models/user";

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm: any;

   constructor(private authService: AuthenticatorService, private router: Router)
   {
      this.loginForm = {
         email: '',
         password: ''
      }
   }

   ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(
         (isLoggedIn) => {
            if (isLoggedIn) {
               this.authService.redirectoDashoard();
            }
         }
      );
      this.loginForm = new FormGroup({
         email: new FormControl(''),
         password: new FormControl('')
      })

   }

   onSubmit()
   {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe(
         (res) => {
            console.log(res);
            if(res)
            {
               let user : User = res['user'];
               if(user.role==="ROLE_ADMIN"){

                  this.router.navigateByUrl('/dashboard');
               }
               else {
                  alert('Login failed because of wrong role');
                  this.router.navigateByUrl('/login');
               }
            }else {
               alert('Login failed');
               this.router.navigateByUrl('/login');
            }

         },
         (err) => {
            console.log(err);
            alert('Login failed');
         }
      );
   }
}
