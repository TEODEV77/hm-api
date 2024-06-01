import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Emily',
    description: `The user's first name.`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Palacio',
    description: `The user's last name.`,
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'emily@test.com',
    description: `The user's unique email address`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Wa$14$LybYdS7bg',
    description: `'The user's password (hashed for security)`,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
