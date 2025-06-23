import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dtos/send-email.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('PROD_MAIL_HOST'),
      port: Number(this.configService.get<string>('PROD_MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get<string>('PROD_MAIL_USER'),
        pass: this.configService.get<string>('PROD_MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(data: SendEmailDto) {
    const { from, receipients, subject, html } = data;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME')!,
        address: this.configService.get<string>('DEF_MAIL_FROM')!,
      },
      to: receipients,
      subject,
      html,
    };

    try {
      const info = await transport.sendMail(options);
      console.log('Email sent: ', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('Internal Server Error', err);
    }
  }
}
