import {OrderItem} from "./order-item";
import {Payment} from "./payment";
import {User} from "./user";

export interface Order {
   client: User;
   created_at: string;
   customer_id: number;
   id: number;
   more_information: string;
   order_items: OrderItem[];
   payment: Payment;
   status: string;
   total: number;
   updated_at: string;
}
