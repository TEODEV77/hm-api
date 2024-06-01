import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';



export function RegisterSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Creates a new User' }),
    ApiBody({ type: CreateUserDto, description: 'User properties' }),
    ApiCreatedResponse({ description: 'User created successfully' }),
    ApiBadRequestResponse({ description: 'Invalid user data' }),
  );
}
