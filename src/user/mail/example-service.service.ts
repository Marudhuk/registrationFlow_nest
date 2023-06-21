import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { resolve } from 'dns/promises';

@Injectable()
export class ExampleServiceService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: any, token: string) {
        const url = `example.com/auth/confirm?token=${token}`;
        return new Promise(async (resolve, reject) => {
        await this.mailerService.sendMail({
            to: user,
            from:"noreply@gmail.com",
            subject: 'Email Verification',
            template: './email-verification', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                token: token,
                url,
            },
        })
        .then(() => {
            console.log("Email sent to "+user);
            resolve(true);
        }
        )
        .catch((err) => {
            console.log(err);
            reject(false);
        }
        );

    })
}

}
