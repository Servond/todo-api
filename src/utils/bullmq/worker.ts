import { Worker, Job } from "bullmq";

export const worker = async (queueName: string, jobs: Function) => {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name == "sendMail") {
        await jobs(job);
      }
    },
    {
      connection: {
        host: "localhost",
        port: 8081,
      },
    }
  );
};
