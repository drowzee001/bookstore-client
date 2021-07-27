import { CartItem } from './CartItem';

export interface Order {
  _id?: string;
  user_id: string;
  items: CartItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
  orderTotal: number;
  created: Date;
  confirm?: boolean;
}
