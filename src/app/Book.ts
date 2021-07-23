export interface Book {
  _id?: string;
  title: string;
  author: string;
  price: string;
  description?: string;
  img?;
  created: string;
  quantity?: number;
  confirm?: boolean;
}
