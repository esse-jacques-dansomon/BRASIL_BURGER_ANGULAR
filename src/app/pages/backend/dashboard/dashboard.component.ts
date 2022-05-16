import { Component, OnInit } from '@angular/core';
import {StatistiqueService} from "../../../shared/services/statistique.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  constructor(private statistiqueService : StatistiqueService) { }

 data$ = this.statistiqueService.getStatistique();


}
