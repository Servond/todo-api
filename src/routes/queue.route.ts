import { Routes } from "@/interfaces/routes.interface";
import { Request, Response, NextFunction, Router } from "express";
import { emailQueue } from "@/utils/bullmq/queue";
import { worker } from "@/utils/bullmq/worker";
import { sendMail } from "@/utils/bullmq/jobs/sendMail";
import { queueListener } from "@/utils/bullmq/listener";

export class QueueRoute implements Routes {
  router: Router;
  path: string;

  constructor() {
    this.router = Router();
    this.path = "/queue";
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/enqueue`,
      async (req: Request, res: Response, next: NextFunction) => {
        const { email, message } = req.body;

        await emailQueue.add("sendMail", {
          email,
          message,
        });

        res.send("enqueue finish");
      }
    );
    this.router.get(
      `${this.path}/process`,
      async (req: Request, res: Response, next: NextFunction) => {
        await worker("email", sendMail);
        queueListener("email");
        res.send("done");
      }
    );
  }
}
