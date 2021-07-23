import { Book } from './Book';

export interface CartItem {
  id?: string;
  user_id: string;
  book_id?: string;
  quantity: number;
  book?: Book;
}
