import prisma from "@/prisma";
import { Todo } from "@/interfaces/todo.interface";
import { Service } from "typedi";

@Service()
export class TodoQuery {
  public getTodosQuery = async (userId: number): Promise<Todo[] | null> => {
    try {
      const todo = await prisma.todos.findMany({
        where: {
          userId,
        },
      });

      return todo;
    } catch (err) {
      throw err;
    }
  };

  public createTodoQuery = async (
    userId: number,
    task: string
  ): Promise<Todo> => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const todo = await prisma.todos.create({
            data: {
              userId,
              task: task.toUpperCase(),
              isCompleted: false,
            },
          });

          return todo;
        } catch (err) {
          throw err;
        }
      });
      return t;
    } catch (err) {
      throw err;
    }
  };
}
