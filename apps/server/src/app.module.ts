import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {AppController} from "./app.controller"
import { AppService } from './app.service';
import { appConfig, ENV_VALIDATION_SCHEMA } from './AppConfig';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: ENV_VALIDATION_SCHEMA,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
