import { API_KEY } from "@/config";

import { Auth } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/user.interface";
import { HttpException } from "@/exceptions/http.exception";

import Container, { Service } from "typedi";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AuthQuery } from "@/queries/auth.query";
import { UserQuery } from "@/queries/user.query";

@Service()
export class AuthAction {
  authQuery = Container.get(AuthQuery);
  userQuery = Container.get(UserQuery);

  public registerAction = async ({ email, password }: Auth) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (findUser)
        throw new HttpException(500, "User with that email already exist");

      const salt = await genSalt(10);
      const hashPass = await hash(password, salt);

      const result = await this.authQuery.registerQuery(email, hashPass);

      return result;
    } catch (err) {
      throw err;
    }
  };

  public loginAction = async ({ email, password }: Auth) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser)
        throw new HttpException(500, "User with that email doesn't exist");

      const isValid = await compare(password, findUser.password);

      if (!isValid) throw new HttpException(500, "Incorrect password");

      const payload = {
        email: findUser.email,
        isVerified: findUser.isVerified,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });

      return token;
    } catch (err) {
      throw err;
    }
  };

  public refreshTokenAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      const payload = {
        email: findUser.email,
        isVerified: findUser.isVerified,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });

      return token;
    } catch (err) {
      throw err;
    }
  };

  public verifyAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      await this.authQuery.verifyQuery(findUser.email);
    } catch (err) {
      throw err;
    }
  };
}
