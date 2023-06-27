import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailActions } from "../enums";
import { Token, User } from "../models";
import { emailService } from "../services";

dayjs.extend(utc);

const reminder = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  const oldTokens = await Token.find({
    createdAt: { $lte: previousMonth },
  });

  const ids = oldTokens.map((item) => item._userId);

  const users = await User.find({ _id: { $in: ids } });

  await Promise.all(
    users.map(async ({ name, email }) => {
      return await emailService.sendMail(email, EEmailActions.REMIND, {
        name: name,
      });
    })
  );
  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const sendInviteMail = new CronJob("0 0 2 * * *", reminder);
