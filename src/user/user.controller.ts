import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ExampleServiceService } from './mail/example-service.service';
import { OtpService } from './otp/otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/registration.dto';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService, private mailer: ExampleServiceService, private otpService: OtpService) { }

  @Post('singUp')
  async registerUser(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto, "createUserDto controller")
      let userData = await this.userService.getUserByEmail(createUserDto);
      console.log(userData, "userDataaaa")
      if (userData) {
        if (userData.isVerified) {
          return res.status(HttpStatus.OK).json({
            message: "something went wrong",
            status: false,
          })
        } else {
          let otp = await this.otpService.generateOtp();
          let result = await this.mailer.sendUserConfirmation(createUserDto.email, otp);
          console.log(result,"result for verified 0");
          if (result) {
            let otpObj = {
              otp: otp,
              email: createUserDto.email,
            }
            console.log(otpObj,"otpObjjjj");
            this.userService.registerOtp(otpObj);
            res.status(HttpStatus.OK).json({
              message: "Email Verified Successfully",
              status: result
            });
          } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: "Email Not Verified resend otp",
              status: result
            });
          }
        }
      } else {
        console.log("New User")
        let otp = await this.otpService.generateOtp();
        let otpObj = {
          otp: otp,
          email: createUserDto.email,
        }
        let result = await this.mailer.sendUserConfirmation(createUserDto.email, otp);
        if (result) {
          console.log(createUserDto,"createUserDto for new user")
          await this.userService.registerOtp(otpObj);
          await this.userService.registerUser(createUserDto);
          res.status(HttpStatus.OK).json({
            message: "Email Sent successfully and User added successfully",
            status: result
          });
        } else {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Email Not Verified resending otp",
            status: result
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Employee could not be added",
        status: false
      })
    }
  }

  @Put('verifyOtp')
  async verifyOtp(@Req() req: Request, @Res() res: Response,@Body() verifyOtp: VerifyOtpDto ) {
    let user = await this.userService.verifyotp(verifyOtp);
    if(user){
      await this.userService.updateOtpIsVerified(user.id);

      res.status(HttpStatus.OK).json({
        message: "OTP verified successfully",
        status: true
      });
    }
    console.log(user,"user for verify otp")
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
