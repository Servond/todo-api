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
    // untuk bisa menampilkan gambar di front end, gunakan express.static ke folder image kalian
    // sesuaikan dengan nama folder, contoh nama folder image saya adalah public maka menggunakan
    // express.static(express.static(path.join(__dirname, "public"))
    // jika ada request masuk ke api url / images contoh http://localhost:8080/images/avatar
    // maka express static akan mengarahkan ke folder public/avatar
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
