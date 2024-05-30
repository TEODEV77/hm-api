import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserPayload } from 'src/auth/interfaces/jwt.user.payload';

@Injectable()
export class JwTokenService {
    constructor(private readonly jwtService: JwtService) {}

    generateAuthJwt(payload: JwtUserPayload) {
        payload.type = 'auth';
        Object.freeze(payload);
        return this.jwtService.sign(payload);
    }

    verifyAuthJwt(token: string): JwtUserPayload | null {
        try {
            const decoded = this.jwtService.verify(token) as JwtUserPayload; 

            if (decoded && decoded.type === 'auth') {
                return decoded;
            } else {
                throw new BadRequestException(`Token is invalid`)
            }
        } catch (error) {
            throw new BadRequestException(`Token is invalid`);
        }
    }
}
