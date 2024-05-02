import { Todo } from "@/interfaces/todo.interface";
import { HttpException } from "@/exceptions/http.exception";

import Container, { Service } from "typedi";

import { TodoQuery } from "@/queries/todo.query";
import { UserQuery } from "@/queries/user.query";

@Service()
export class TodoAction {
  userQuery = Container.get(UserQuery);
  todoQuery = Container.get(TodoQuery);

  public getTodosAction = async (email: string) => {
    try {
      const user = await this.userQuery.getUserByEmail(email);

      if (!user) throw new HttpException(500, "Something went wrong");

      const result = await this.todoQuery.getTodosQuery(user.id);

      return result;
    } catch (err) {
      throw err;
    }
  };

  public createTodoAction = async (email: string, task: string) => {
    try {
      if (!task || !task.trim())
        throw new HttpException(500, "Task cannot be empty");

      const user = await this.userQuery.getUserByEmail(email);

      if (!user) throw new HttpException(500, "Something went wrong");

      const result = await this.todoQuery.createTodoQuery(user.id, task);

      return result;
    } catch (err) {
      throw err;
    }
  };
}
