import { Queue } from "bullmq";

export const emailQueue = new Queue("email", {
  connection: {
    host: "localhost",
    port: 8081,
  },
});

export const imageQueue = new Queue("image", {
  connection: {
    host: "localhost",
    port: 8081,
  },
});
