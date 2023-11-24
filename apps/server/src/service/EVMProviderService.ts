import { Injectable } from '@nestjs/common';
import { EnvironmentNetwork } from '@waveshq/walletkit-core';
import axios from 'axios';
import { ethers, JsonRpcProvider } from 'ethers';

@Injectable()
export class EVMProviderService {
  provider: ethers.JsonRpcProvider;

  evmRpcUrl: string;

  constructor(network: EnvironmentNetwork) {
    this.evmRpcUrl = this.getEthRpcUrl(network);
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

  getEthRpcUrl(network: EnvironmentNetwork): string {
    // TODO: Add proper ethereum RPC URLs for each network
    switch (network) {
      case EnvironmentNetwork.LocalPlayground:
        return 'http://localhost:19551';
      case EnvironmentNetwork.RemotePlayground:
      case EnvironmentNetwork.DevNet:
      case EnvironmentNetwork.Changi:
        return 'http://34.34.156.49:20551'; // TODO: add final eth rpc url for changi, devnet and remote playground
      case EnvironmentNetwork.MainNet:
        return 'https://eth.mainnet.ocean.jellyfishsdk.com'; // TODO: add final eth rpc url for mainnet, with proper domain name
      case EnvironmentNetwork.TestNet:
      default:
        return 'https://eth.testnet.ocean.jellyfishsdk.com';
    }
  }
}
