import { EEmailActions } from "../enums";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Welcome to our powerful CRUD platform",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "WE CONTROL YOUR PASSWORD",
  },
  [EEmailActions.REMIND]: {
    templateName: "remind",
    subject: "Haven't seen you long time. Come back:)",
  },
};
