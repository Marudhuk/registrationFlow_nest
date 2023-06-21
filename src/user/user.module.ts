import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserOtp } from './entities/user.entity';
import { ExampleServiceService } from './mail/example-service.service';
import { OtpService } from './otp/otp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserOtp
    ]),
  ],
  controllers: [UserController],
  providers: [UserService,ExampleServiceService, OtpService]
})
export class UserModule {}
