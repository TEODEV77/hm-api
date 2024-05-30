import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './third-party/bcrypt/bcrypt.module';
import { ConfigModule } from '@nestjs/config';
import { Environment } from './config/environment';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { JwTokenModule } from './third-party/jw-token/jw-token.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [
    AuthModule,
    BcryptModule,
    JwTokenModule,
    ConfigModule.forRoot({ load: [Environment] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HotelModule,
    
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
