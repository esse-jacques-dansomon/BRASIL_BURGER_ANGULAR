import { Component, OnInit } from '@angular/core';
import {AuthenticatorService} from "../../../shared/services/authentificator.service";
import {User} from "../../../shared/models/user";

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

   public user : User;
   constructor(public authService: AuthenticatorService) {
         this.user = this.authService.getUser();
   }

   ngOnInit(): void {
      this.user = this.authService.getUser();
   }

   logOut() {
      this.authService.logout()
   }
}
