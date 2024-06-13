import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateHotelDto } from '../dto/create-hotel.dto';


export function CreateHotelSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Creates new hotel' }),
    ApiBody({ type: CreateHotelDto, description: 'Hotel properties' }),
    ApiCreatedResponse({ description: 'hotel was created correctly' }),
    ApiBadRequestResponse({ description: 'Invalid data' }),
    ApiForbiddenResponse({ description: 'You are not allowed to create a hotel' })
  );
}
