import prisma from "@/prisma";
import { Service } from "typedi";
import * as handlebars from "handlebars";
import path from "path";
import fs from "fs";
import { sign } from "jsonwebtoken";

import { User } from "@/interfaces/user.interface";
import { transporter } from "../helpers/nodemailer";
import { FE_URL, API_KEY } from "@/config";

@Service()
export class AuthQuery {
  private sendRegistrationEmail = async (user: User) => {
    try {
      const payload = {
        email: user.email,
        isVerified: user.isVerified,
      };

      const token = sign(payload, String(API_KEY), {
        expiresIn: "1hr",
      });

      const templatePath = path.join(
        __dirname,
        "../templates",
        "registrationEmail.hbs"
      );
      const urlVerify = `${FE_URL}/verify?token=${token}`;
      const templateSource = fs.readFileSync(templatePath, "utf-8");

      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        email: user.email,
        url: urlVerify,
      });

      await transporter.sendMail({
        from: "sender address",
        to: user.email,
        subject: "welcome to Todo App",
        html,
      });
    } catch (err) {
      throw err;
    }
  };

  public registerQuery = async (
    email: string,
    password: string,
    avatar: string
  ): Promise<User> => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const user = await prisma.user.create({
            data: {
              email,
              password,
              avatar,
              isVerified: false,
            },
          });

          await this.sendRegistrationEmail(user);

          return user;
        } catch (err) {
          throw err;
        }
      });

      return t;
    } catch (err) {
      throw err;
    }
  };

  public verifyQuery = async (email: string): Promise<void> => {
    try {
      await prisma.$transaction(async (prisma) => {
        try {
          await prisma.user.update({
            data: {
              isVerified: true,
            },
            where: { email },
          });
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      throw err;
    }
  };

  public updateIsVerified = async (): Promise<void> => {
    try {
      await prisma.$transaction(async (prisma) => {
        try {
          await prisma.user.updateMany({
            data: {
              isVerified: false,
            },
            where: {
              isVerified: true,
            },
          });
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      throw err;
    }
  };
}
