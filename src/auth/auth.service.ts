import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { BcryptService } from '../third-party/bcrypt/bcrypt.service';
import { duplicateKey } from 'src/utils/errors/duplicate-key';

import { JwtUserPayload } from './interfaces/jwt.user.payload';
import { LoginUserDto } from './dto/login-user.dto';
import { JwTokenService } from 'src/third-party/jw-token/jw-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwTokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const plainText = createUserDto.password;
    const password = this.bcryptService.generateHash(plainText);
    createUserDto.password = password;

    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        duplicateKey('email');
      }
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOneByEmail(loginUserDto.email);
    if (user){
      const isPasswordMatch = this.bcryptService.compareHash(loginUserDto.password, user.password);
      if (isPasswordMatch) {
        const payload: JwtUserPayload = {
          id: user.id,
          type: '',
          email: user.email,
          name: user.name,
          role: user.role
        };
        const token = this.jwtService.generateAuthJwt(payload);
        return {user, token}
      }
    }else{
      throw new BadRequestException(`User or password incorrect`);
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException(`User with email: ${email} not found`);
      }
      return user;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async findOneById(id: string) {
    try {
      const user = await this.userModel.findOne({ _id : id });
      if (!user) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }
      return user;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async checkToken(token: string){
    const decoded = this.jwtService.verifyAuthJwt(token);
    const user = await this.findOneById(decoded.id);
    return {user, token};
  }

}
