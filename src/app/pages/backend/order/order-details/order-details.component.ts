import {Component, Inject, OnInit} from '@angular/core';
import {Order} from "../../../../shared/models/order";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
     @Inject(MAT_DIALOG_DATA) public order: Order
  ) { }

  ngOnInit(): void {
  }

}
