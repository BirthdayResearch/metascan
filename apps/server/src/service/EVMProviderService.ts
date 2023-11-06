import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ethers, JsonRpcProvider } from 'ethers';

@Injectable()
export class EVMProviderService {
  provider: ethers.JsonRpcProvider;

  evmRpcUrl: string;

  constructor(private configService: ConfigService) {
    this.evmRpcUrl = this.configService.getOrThrow('evmRpcUrl') || 'http://localhost:20551';
    this.provider = new JsonRpcProvider(this.evmRpcUrl);
  }

  async evmRpc(method: string, params: any[], options?: { [key: string]: string }): Promise<any> {
    const raw = JSON.stringify({
      method,
      params,
      id: new Date().getTime(),
      jsonrpc: '2.0',
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: this.evmRpcUrl,
      data: raw,
      ...options,
    };
    const res = await axios(requestOptions);
    return res?.data?.result;
  }
}
