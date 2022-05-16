import {Product} from "./product";

export interface OrderItem {
   id: number;
   price: number;
   quantity: number;
   total: number;
   product: Product;
}
