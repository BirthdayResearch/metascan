import { Injectable, Logger } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { ethers, formatUnits } from 'ethers';

import { DST20ABI } from '../AppConfig';
import { EVMProviderService } from './EVMProviderService';

@Injectable()
export class DST20TokenService {
  private readonly logger: Logger;

  constructor(private provider: EVMProviderService) {
    this.logger = new Logger(DST20TokenService.name);
  }

  async getTotalSupply(contractAddress: string, blockTag: number | string = 'latest'): Promise<string> {
    const tokenContract = new ethers.Contract(contractAddress, DST20ABI, this.provider);
    const totalSupply = await tokenContract.totalSupply.staticCall({ blockTag });
    const decimals = await tokenContract.decimals();
    return formatUnits(totalSupply, decimals); // Convert to ether units
  }

  async getDecimal(contractAddress: string): Promise<number> {
    const tokenContract = new ethers.Contract(contractAddress, DST20ABI, this.provider);
    const decimal = await tokenContract.decimals();
    return new BigNumber(decimal).toNumber();
  }

  async getBalanceOf(contractAddress: string, address: string, blockTag: number | string = 'latest'): Promise<string> {
    const tokenContract = new ethers.Contract(contractAddress, DST20ABI, this.provider);
    const balance = await tokenContract.balanceOf.staticCall(address, { blockTag });
    const decimals = await this.getDecimal(contractAddress);
    return formatUnits(balance, decimals); // Convert to ether units
  }

  /**
   *  Get DST20 contract address
   *  https://github.com/DeFiCh/ain/blob/f5a671362f9899080d0a0dddbbcdcecb7c19d9e3/lib/ain-contracts/src/lib.rs#L79
   */
  getAddressFromDST20TokenId(tokenId: string): string {
    const parsedTokenId = BigInt(tokenId);
    const numberStr = parsedTokenId.toString(16); // Convert parsedTokenId to hexadecimal
    const paddedNumberStr = numberStr.padStart(38, '0'); // Pad with zeroes to the left
    const finalStr = `ff${paddedNumberStr}`;
    const ethAddress = ethers.getAddress(finalStr);
    return ethAddress;
  }
}
