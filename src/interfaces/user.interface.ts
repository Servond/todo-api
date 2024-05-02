export interface User {
  id?: number;
  email: string;
  password: string;
  isVerified: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
