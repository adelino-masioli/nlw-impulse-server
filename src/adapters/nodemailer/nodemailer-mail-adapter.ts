import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9439c018b6af15",
    pass: "2df32fdccc2b11",
  },
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Team feedback <feeback@mail.com>",
      to: "adelino@frontkom.com",
      subject,
      html: body,
    });
  }
}
