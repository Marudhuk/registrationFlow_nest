import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserOtp } from './entities/user.entity';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { VerifyOtpDto } from './dto/registration.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>,@InjectRepository(UserOtp) private otpRepository:Repository<UserOtp>) {}

   getUserByEmail(createUserDto: CreateUserDto) {
    return this.userRepository.findOne({where:{email:createUserDto.email}});
  }

   registerUser(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto,"createUserDto service")
    return this.userRepository.save(createUserDto);
  }

   registerOtp(otp:any):Promise<any> {
    return this.otpRepository.save(otp);
  }

  verifyotp(verifyData: VerifyOtpDto): Promise<any> {
    return this.otpRepository.findOne({
      select:['id','email','otp','isVerified'],
      where:{email:verifyData.email,otp:verifyData.otp}
    });
  }
  updateOtpIsVerified(id: number) {
    return this.otpRepository.update(id,{isVerified:true});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
