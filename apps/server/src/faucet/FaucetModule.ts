import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { RecaptchaGuard } from '../recaptcha/RecaptchaGuard';
import { FaucetController } from './FaucetController';
import { FaucetService } from './FaucetService';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [FaucetController],
  providers: [FaucetService, RecaptchaGuard],
})
export class FaucetModule {}
