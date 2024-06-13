import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';


import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUserPayload } from '../interfaces/jwt.user.payload';
import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtUserPayload): Promise <User | any> {
    
    const { email } = payload; 

    const user = await this.authService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Token no valid');
      
    return user;

  }
}
