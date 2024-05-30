import { BadRequestException } from '@nestjs/common';

export const duplicateKey = (key: string) => {
  throw new BadRequestException(`${key} already exists in the database`);
};

