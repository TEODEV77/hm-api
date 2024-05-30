import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptModule } from 'src/third-party/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule,
    BcryptModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy,PassportModule,JwtModule]
})
export class AuthModule {}
