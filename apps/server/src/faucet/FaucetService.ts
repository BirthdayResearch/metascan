/* eslint-disable guard-for-in */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentNetwork } from '@waveshq/walletkit-core';
import { ethers, parseEther, TransactionResponse } from 'ethers';

import { EVMProviderService } from '../service/EVMProviderService';

@Injectable()
export class FaucetService {
  private readonly logger: Logger;

  private readonly privateKey: string;

  private readonly retry = 10;

  constructor(private configService: ConfigService) {
    this.logger = new Logger(FaucetService.name);
    this.privateKey = this.configService.getOrThrow('privateKey');
  }

  async transferFund(address, amount, network, retryCount = 1): Promise<TransactionResponse> {
    try {
      const evmProviderService = new EVMProviderService(network);
      const wallet = new ethers.Wallet(this.privateKey, evmProviderService.provider);
      const nonce = await evmProviderService.provider.getTransactionCount(wallet.address);
      const tx = {
        to: address,
        value: parseEther(amount),
        nonce,
      };
      return await wallet.sendTransaction(tx);
    } catch (e) {
      if (e.code === 'SERVER_ERROR' && retryCount < this.retry) {
        this.logger.error(
          `Getting SERVER_ERROR retrying: ${retryCount} for ${amount} DFI ${network} to address ${address}`,
        );
        return await this.transferFund(address, amount, network, retryCount + 1);
      }
      throw new Error(e);
    }
  }

  async sendFundsToUser(address: string, amount: string, network: EnvironmentNetwork): Promise<TransactionResponse> {
    this.logger.log(`Initiating transfer of ${amount} DFI ${network} to address ${address}`);
    const response = await this.transferFund(address, amount, network);
    this.logger.log(
      `Transfer done to address ${address} of amount ${amount} DFI ${network} with txn hash ${
        response.hash
      } at ${new Date().toTimeString()}.`,
    );
    return response;
  }
}
