import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { LoginUserDto } from '../dto/login-user.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Returns user token' }),
    ApiBody({ type: LoginUserDto, description: 'User login properties' }),
    ApiCreatedResponse({ description: 'User logged in successfully' }),
    ApiBadRequestResponse({ description: 'Invalid login data' }),
  );
}
