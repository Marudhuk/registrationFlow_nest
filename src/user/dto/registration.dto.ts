import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;


}
export class VerifyOtpDto {
    
    @ApiProperty()
    otp: string;

    @ApiProperty()
    email: string;

}

