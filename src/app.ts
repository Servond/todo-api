import "reflect-metadata";
import express, { json, Express } from "express";
import cors from "cors";
import path from "path";

import { Routes } from "./interfaces/routes.interface";
import { ErrorMiddleware } from "./middlewares/error.middleware";

export default class App {
  private app: Express;
  port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = 8080;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use("/images", express.static(path.join(__dirname, "public")));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
