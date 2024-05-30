import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['admin', 'travel agent', 'client'])
  status?: string;
}
