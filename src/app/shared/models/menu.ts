import {Burger} from "./burger";
import {Complement} from "./complement";
import {Product} from "./product";

export interface Menu extends Product{

   cook_time: number;
   burger_id: number;
   burger: Burger;
   complements: Complement[];
   list_complements_id: number[];
}
