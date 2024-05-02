import prisma from "@/prisma";
import { User } from "@/interfaces/user.interface";

import { Service } from "typedi";

@Service()
export class UserQuery {
  public getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  };
}
