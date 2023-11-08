import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { FaucetController } from './FaucetController';
import { FaucetService } from './FaucetService';

@Module({
  imports: [CacheModule.register()],
  controllers: [FaucetController],
  providers: [FaucetService],
})
export class FaucetModule {}
