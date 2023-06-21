import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOtpDto } from './create-otp.dto';

export class UpdateUserDto extends PartialType(CreateOtpDto) {

}
