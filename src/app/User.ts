export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  created?: string;
  admin: boolean;
  confirm?: boolean;
}
