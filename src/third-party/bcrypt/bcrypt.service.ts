import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  generateHash(plainText: string) {
    const saltRounds = 14;
    return bcrypt.hashSync(plainText, saltRounds);
  }

  compareHash(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
