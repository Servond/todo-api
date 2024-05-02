import { AuthController } from "@/controllers/auth.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class AuthRoute implements Routes {
  router: Router;
  path: string;
  private Auth: AuthController;
  private Guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = "/auth";
    this.Auth = new AuthController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.Auth.registerController);
    this.router.post(`${this.path}/login`, this.Auth.loginController);
    this.router.get(
      `${this.path}/verify`,
      this.Guard.verifyToken,
      this.Auth.verifyController
    );
    this.router.get(
      `${this.path}/`,
      this.Guard.verifyToken,
      this.Auth.refreshTokenController
    );
  }
}
