import { WhaleApiClient, WhaleApiClientOptions } from '@defichain/whale-api-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentNetwork, newOceanOptions, newWhaleAPIClient } from '@waveshq/walletkit-core';

@Injectable()
export class WhaleApiService {
  whaleApi: WhaleApiClient;

  whaleOptions: WhaleApiClientOptions;

  network: EnvironmentNetwork;

  constructor(private configService: ConfigService) {
    this.network = this.configService.getOrThrow('network') || EnvironmentNetwork.LocalPlayground;
    this.whaleOptions = this.network === EnvironmentNetwork.LocalPlayground
      ? ({
          url: this.configService.getOrThrow('whaleURL'),
          network: 'regtest',
          version: 'v0',
        } as WhaleApiClientOptions)
      : newOceanOptions(this.network);
    this.whaleApi = newWhaleAPIClient(this.whaleOptions);
  }
}
