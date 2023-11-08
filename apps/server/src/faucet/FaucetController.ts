import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, HttpException, Inject, Param, Query, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentNetwork } from '@waveshq/walletkit-core';
import { TransactionResponse } from 'ethers';

import { AddressValidationInterceptor } from './AddressValidationInterceptor';
import { DefaultNetworkInterceptor } from './DefaultNetworkInterceptor';
import { FaucetService } from './FaucetService';


@Controller('faucet')
export class FaucetController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
    private readonly faucetService: FaucetService,
    private configService: ConfigService,
  ) {}

  @Get(':address')
  @UseInterceptors(AddressValidationInterceptor, DefaultNetworkInterceptor)
  async sendFunds(@Param('address') address: string, @Query('network') network: EnvironmentNetwork): Promise<TransactionResponse> {
    const key = `FAUCET_${address}_${network}`;
    const isCached = await this.cacheManager.get(key);
    if (isCached) {
      throw new HttpException('Transfer already done, please try again later.', 403);
    }
    const amountToSend: string = this.configService.getOrThrow('faucetAmountPerRequest'); // Amount to send in DFI
    const ttl = +this.configService.getOrThrow('throttleTimePerAddress')
    const response = await this.faucetService.sendFundsToUser(address, amountToSend, network);
    await this.cacheManager.set(key, true, { ttl });
    return response;
  }
}
