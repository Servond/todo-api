import { Request, Response, NextFunction } from "express";
import { Todo } from "@/interfaces/todo.interface";

import Container from "typedi";

import { TodoAction } from "@/actions/todo.action";

export class TodoController {
  todo = Container.get(TodoAction);

  public getTodosController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;

      const result = await this.todo.getTodosAction(email);

      res.status(200).json({
        message: "Get todos success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public createTodoController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.user;
      const { task } = req.body;

      const result = await this.todo.createTodoAction(email, task);

      res.status(200).json({
        message: "Create todo success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
