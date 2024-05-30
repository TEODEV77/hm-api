import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { BcryptService } from '../third-party/bcrypt/bcrypt.service';
import { duplicateKey } from 'src/utils/errors/duplicate-key';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private readonly bcryptService:BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const plainText = createUserDto.password;
    const password = this.bcryptService.generateHash(plainText);
    createUserDto.password = password;

    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      if(error.code === 11000){
        duplicateKey('email');
      }
    }
  
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOneByEmail(email: string) {
    return `This action returns a #${email} auth`;
  }
}
