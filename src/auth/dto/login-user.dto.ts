import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  
  @ApiProperty({
    example: 'emily@test.com',
    description: `The user's unique email address`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'b72e90ac#d45',
    description: `'The user's password (hashed for security)`,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
