import { TransferDomainType } from '@defichain/jellyfish-api-core/dist/category/account';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvironmentNetwork } from '@waveshq/walletkit-core';
import { JsonRpcProvider, parseEther } from 'ethers';
import * as request from 'supertest';
import waitForExpect from 'wait-for-expect';

import { EVMProviderService } from '../service/EVMProviderService';
import { DeFiChainStubContainer, StartedDeFiChainStubContainer } from './containers/DeFiChainStubContainer';
import { MetachainTestingApp } from './MetachainTestingApp';

export async function waitForTxnToConfirm(
  provider: JsonRpcProvider,
  hash: string,
  timeout: number = 30_000,
): Promise<void> {
  await waitForExpect(async () => {
    const txn = await provider.getTransactionReceipt(hash);
    expect(txn?.status).toStrictEqual(1);
  }, timeout);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

describe('Faucet (e2e)', () => {
  let app: NestFastifyApplication;
  let defichain: StartedDeFiChainStubContainer;
  let testing: MetachainTestingApp;
  let evmRpcUrl: string
  let dvmAddress;
  let provider: JsonRpcProvider
  const amount = '1'
  const evmAddress = "0x9f1FF3f9A4F99f39Ec7F799F90e54bfC88B43FFA"
  const evmPrivateKey = "0x814233c91d926169e9a6817db4de4f325cee91639ff6cfce74029ec9e568d2ad"
  beforeAll(async () => {
    defichain = await new DeFiChainStubContainer().start();
    evmRpcUrl = await defichain.getEvmURL();
    dvmAddress = await defichain.defid.rpc.getNewAddress('legacy', 'legacy');

    testing = new MetachainTestingApp();
    app = await testing.createNestApp({ 
      faucetAmountPerRequest: amount,
      throttleTimePerAddress: '20',
      privateKey: evmPrivateKey,
    });
    provider = new JsonRpcProvider(evmRpcUrl);
    await defichain.playgroundClient.wallet.sendUtxo('20', dvmAddress);
    await defichain.playgroundClient.wallet.sendToken('0', '20', dvmAddress);
    await defichain.generateBlock(1);
    await defichain.playgroundRpcClient.account.transferDomain([
      {
        src: {
          address: dvmAddress,
          amount: '10@0',
          domain: TransferDomainType.DVM,
        },
        dst: {
          address: evmAddress,
          amount: '10@0',
          domain: TransferDomainType.EVM,
        },
      },
    ]);
    await defichain.generateBlock(10);
    await testing.start();
  });

  afterAll(async () => {
    await defichain.stop();
    await testing.stop();
    app = undefined;
  });


  it('/faucet/:address (GET) should send DFI to address', async () => {
    // mock getEthRpcUrl method
    EVMProviderService.prototype.getEthRpcUrl = jest.fn().mockReturnValue(evmRpcUrl);
    const address = await defichain.defid.rpc.getNewAddress('eth', 'eth');
    const response = await request(app.getHttpServer())
          .get(`/faucet/${address}?network=${EnvironmentNetwork.LocalPlayground}`)
          .expect(200)
    await waitForTxnToConfirm(provider, response.body.hash)
    const balance = await provider.getBalance(address);
    expect(parseEther(amount).toString()).toStrictEqual(balance.toString());
  });
});
