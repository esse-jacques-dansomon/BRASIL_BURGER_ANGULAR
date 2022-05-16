import {TypeComplement} from "./TypeComplement";
import {Product} from "./product";

export interface Complement extends Product{
   type: TypeComplement;
   type_id?: number ;
}
