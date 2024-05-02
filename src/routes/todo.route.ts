import { TodoController } from "@/controllers/todo.controller";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class TodoRoute implements Routes {
  router: Router;
  path: string;
  private Todo: TodoController;
  private Guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = "/todos";
    this.Todo = new TodoController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/`,
      this.Guard.verifyToken,
      this.Todo.getTodosController
    );
    this.router.post(
      `${this.path}/`,
      this.Guard.verifyToken,
      this.Todo.createTodoController
    );
  }
}
