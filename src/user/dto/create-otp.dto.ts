import { ApiProperty } from "@nestjs/swagger";

export class CreateOtpDto {
    
    @ApiProperty()
    otp: string;

    @ApiProperty()
    email: string;
    


}