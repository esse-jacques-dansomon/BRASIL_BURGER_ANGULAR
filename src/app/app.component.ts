import { Component } from '@angular/core';
import {AuthenticatorService} from "./shared/services/authentificator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ANGULAR_BRESIL_BURGER';

   constructor(private authenticatorService: AuthenticatorService) {
   }
}
