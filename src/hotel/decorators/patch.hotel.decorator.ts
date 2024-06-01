import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateHotelDto } from '../dto/update-hotel.dto';


export function UpdateHotelSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates a hotel' }),
    ApiBody({ type: UpdateHotelDto, description: 'Hotel properties' }),
    ApiCreatedResponse({ description: 'hotel was updated correctly' }),
    ApiBadRequestResponse({ description: 'Invalid data' }),
    ApiForbiddenResponse({ description: 'You are not allowed to update a hotel' })
  );
}
