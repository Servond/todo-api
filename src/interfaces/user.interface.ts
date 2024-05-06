export interface User {
  id?: number;
  email: string;
  password: string;
  avatar?: string;
  isVerified: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
