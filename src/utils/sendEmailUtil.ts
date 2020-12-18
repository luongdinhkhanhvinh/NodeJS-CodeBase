import { SES } from "aws-sdk";
import { inject, injectable } from "inversify";
import { AwsConfig } from "src/configs/appConfig";
import { TYPES } from "src/injection/types";

export interface SendEmailUtil {
  sendEmail(fromEmail: string, toEmails: string[], subject: string, emailBody: string): Promise<void>;
}

@injectable()
export class SendEmailUtilImpl implements SendEmailUtil {
  private ses: SES;
  constructor(@inject(TYPES.AwsConfig) private readonly awsConfig: AwsConfig) {
    this.ses = new SES({
      apiVersion: "2010-12-01",
      region: awsConfig.region,
    });
  }

  public async sendEmail(fromEmail: string, toEmails: string[], subject: string, emailBody: string) {
    const params = {
      Destination: {
        ToAddresses: toEmails,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailBody,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: fromEmail,
    };

    await this.ses.sendEmail(params).promise();
  }
}
