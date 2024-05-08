import { QueueEvents } from "bullmq";

export const queueListener = (queueName: string) => {
  const queueEvents = new QueueEvents(queueName, {
    connection: {
      host: "localhost",
      port: 8081,
    },
  });

  queueEvents.on("completed", ({ jobId }) => {
    console.log(`${jobId} done`);
  });

  queueEvents.on(
    "failed",
    ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
      console.error(`${jobId} error`, failedReason);
    }
  );
};
