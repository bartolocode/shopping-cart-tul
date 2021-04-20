import { ProductCart } from './product.model';
import { User } from './user.model';

export interface Order {
  total: number;
  subTotal: number;
  iva: number;
  shipping: number;
  status: StatusOrder;
  createdAt: any;
  numberOrder: number;
  user: User;
  products: Array<ProductCart>;
}
export enum StatusOrder {
  pending,
  completed,
}
