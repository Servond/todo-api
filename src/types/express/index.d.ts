export type User = {
  userId: number;
  email: string;
  avatar: string;
  isVerified: boolean;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
