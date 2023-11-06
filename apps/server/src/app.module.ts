import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from "./app.controller"
import { AppService } from './app.service';
import { appConfig, ENV_VALIDATION_SCHEMA } from './AppConfig';
import { FaucetModule } from './faucet/FaucetModule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: ENV_VALIDATION_SCHEMA,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60_000, // Throttle time window set to 60 seconds
      limit: 10, // Maximum 10 requests allowed within the time window
    }]),
    FaucetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
