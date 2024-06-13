import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptModule } from 'src/third-party/bcrypt/bcrypt.module';
import { JwTokenModule } from 'src/third-party/jw-token/jw-token.module'; 

@Module({
  imports: [
    ConfigModule,
    BcryptModule,
    JwTokenModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy,PassportModule, AuthService]
})
export class AuthModule {}
