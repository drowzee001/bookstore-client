export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  created?: string;
  admin: boolean;
  confirm?: boolean;
}
