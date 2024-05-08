import cron from "node-cron";
import { AuthQuery } from "@/queries/auth.query";

const updateIsVerified = async () => {
  try {
    const auth = new AuthQuery();
    await auth.updateIsVerified();

    console.log("verify user done");
  } catch (err) {
    console.log(err);
  }
};

const updateMinutely = () => {
  cron.schedule("* * * * *", () => {
    updateIsVerified();
    console.log("task running every minute");
  });
};

const updateHourly = () => {
  cron.schedule("0 * * * *", () => {
    console.log("task running every hour");
  });
};

export const startCronJob = () => {
  updateMinutely();
  updateHourly();
};
