import nodemailer from "nodemailer";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: "dananvm@gmail.com",
        pass: "hsnacymtnsyvjutp"
      },
    });
  }

  public async sendEmail(email: string) {}
}

export const emailService = new EmailService();
