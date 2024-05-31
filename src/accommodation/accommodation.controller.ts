import { Controller } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Accommodations')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  
}
