import { removeOldTokens } from "./remove-old-tokens.cron";
import { sendInviteMail } from "./send-invite-mail.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  sendInviteMail.start();
};
