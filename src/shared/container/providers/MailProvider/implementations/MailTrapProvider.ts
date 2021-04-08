import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { mailConfig } from '../../../../../config/mailTrap';
import { IMailProvider } from '../IMailProvider';

@injectable()
class MailTrapProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport(mailConfig);
  }
  async sendEmail(
    from: string,
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    this.client.sendMail({
      from,
      to,
      subject,
      text: body,
      html: body,
    });
  }
}

export { MailTrapProvider };
