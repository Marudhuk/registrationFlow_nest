import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {

     generateOtp(){
        return Math.floor(100000 + Math.random() * 900000).toString();
    }


}
