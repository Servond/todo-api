import path from "path";
import fs from "fs";
import * as handlebars from "handlebars";
import { transporter } from "@/helpers/nodemailer";
import { Job } from "bullmq";

export const sendMail = async (job: Job) => {
  const templatePath = path.join(
    __dirname,
    "../../../templates",
    "sendingEmail.hbs"
  );
  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const compiledTemplate = handlebars.compile(templateSource);
  const html = compiledTemplate({
    email: job.data.email,
    message: job.data.message,
  });

  await transporter.sendMail({
    from: "sender address",
    to: job.data.email,
    subject: "welcome to Todo App",
    html,
  });
};
