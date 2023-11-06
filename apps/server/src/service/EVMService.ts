import { Injectable, Logger } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { TransactionResponseParams } from 'ethers';
import { decodeFunctionData } from 'viem';

import { BalanceMovementI, DST20ABI, DST20BalanceMovementOnBlockI } from '../AppConfig';
import { DST20TokenService } from './DST20TokenService';
import { EVMProviderService } from './EVMProviderService';

@Injectable()
export class EVMService {
  private readonly logger: Logger;

  constructor(
    private dst20TokenService: DST20TokenService,
    private evmProviderService: EVMProviderService,
  ) {
    this.logger = new Logger(EVMService.name);
  }

  async getEthBalance(address: string, blockHeight: number | string = 'latest'): Promise<string> {
    const res = await this.evmProviderService.evmRpc('eth_getBalance', [address, blockHeight]);
    return new BigNumber(res, 16).dividedBy(new BigNumber(10).pow(18)).toString();
  }

  async getDFIBalanceMovementOnBlock(address: string, transactions: TransactionResponseParams[]): Promise<BigNumber> {
    const statsValue = await transactions.reduce(
      async (stats: Promise<BalanceMovementI>, current: any) => {
        const result = await stats;
        const txReceipt = await this.evmProviderService.evmRpc('eth_getTransactionReceipt', [current.hash, true]);
        // check if transaction is not reverted
        if (txReceipt.status === '0x1') {
          // txn happens from given address
          if (current.from?.toLowerCase() === address.toLowerCase()) {
            // calculate Transaction Fee = gas used * gas price
            result.gasUsed = result.gasUsed.plus(
              new BigNumber(current.gas, 16).times(new BigNumber(current.gasPrice, 16)),
            );
            // calculate dfi transferred if any
            result.transferredBalance = result.transferredBalance.plus(new BigNumber(current.value, 16));
          }
          // txn happens to given address
          if (current.to?.toLowerCase() === address.toLowerCase()) {
            // calculate dfi received if any
            result.receivedBalance = result.receivedBalance.plus(new BigNumber(current.value, 16));
          }
        }
        return Promise.resolve(result);
      },
      Promise.resolve({
        gasUsed: new BigNumber(0),
        transferredBalance: new BigNumber(0),
        receivedBalance: new BigNumber(0),
      }),
    );
    // return movement
    return new BigNumber(statsValue.transferredBalance)
      .plus(statsValue.gasUsed)
      .minus(statsValue.receivedBalance)
      .dividedBy(new BigNumber(10).pow(18));
  }

  async getDFIBalanceDifferenceByBlockHash(address: string, transferBlockHash: string): Promise<BigNumber> {
    try {
      // get block details by hash
      const transferBlockDetails = await this.evmProviderService.evmRpc('eth_getBlockByHash', [
        transferBlockHash,
        true,
      ]);
      // convert block number from hex to decimal
      const transferBlockNumber = new BigNumber(transferBlockDetails.number, 16);
      // get balance at current block
      const currentBalance = await this.getEthBalance(address, transferBlockNumber.toNumber());
      // get balance at previous block
      const prevBalance = await this.getEthBalance(address, transferBlockNumber.minus(1).toNumber());

      // get balance movement at current block txn
      const movement = await this.getDFIBalanceMovementOnBlock(address, transferBlockDetails.transactions);
      const blockBalanceDiff = new BigNumber(currentBalance).minus(prevBalance);
      // calculate balance difference happens due to token transfer
      return blockBalanceDiff.plus(movement);
    } catch (err) {
      this.logger.error(err);
      throw new Error(err.message);
    }
  }

  async getDST20BalanceMovementOnBlock(
    contractAddress: string,
    address: string,
    transactions: TransactionResponseParams[],
  ): Promise<BigNumber> {
    const tokenDecimal = await this.dst20TokenService.getDecimal(contractAddress);
    const statsValue = await transactions.reduce(
      async (stats: Promise<DST20BalanceMovementOnBlockI>, current: any) => {
        // txn happens from given address
        const result = await stats;
        // check for contract call (transfer/ transferFrom)
        if (current.to?.toLowerCase() === contractAddress.toLowerCase()) {
          // check is txn is valid or not
          const txReceipt = await this.evmProviderService.evmRpc('eth_getTransactionReceipt', [current.hash, true]);
          // check if transaction is not reverted
          if (txReceipt.status === '0x1') {
            // calculate token transferred if any
            const decodedData: any = decodeFunctionData({
              abi: DST20ABI,
              data: current.input,
            });
            // check for transfer function call of smart contract
            if (decodedData.functionName === 'transfer') {
              const [to, amount] = decodedData.args;
              if (current.from.toLowerCase() === address.toLowerCase()) {
                result.transferredBalance = result.transferredBalance.plus(amount ?? 0);
              }
              if (to?.toLowerCase() === address.toLowerCase()) {
                result.receivedBalance = result.receivedBalance.plus(amount ?? 0);
              }
            }
            // check for transferFrom function call of smart contract
            if (decodedData.functionName === 'transferFrom') {
              const [from, to, amount] = decodedData.args;
              if (from?.toLowerCase() === address.toLowerCase()) {
                result.transferredBalance = result.transferredBalance.plus(amount ?? 0);
              }
              if (to?.toLowerCase() === address.toLowerCase()) {
                result.receivedBalance = result.receivedBalance.plus(amount ?? 0);
              }
            }
          }
        }
        return Promise.resolve(result);
      },
      Promise.resolve({ transferredBalance: new BigNumber(0), receivedBalance: new BigNumber(0) }),
    );
    // return movement
    return new BigNumber(statsValue.transferredBalance)
      .minus(statsValue.receivedBalance)
      .dividedBy(new BigNumber(10).pow(tokenDecimal));
  }

  async getDST20BalanceDifferenceByBlockHash(
    tokenId: string,
    address: string,
    transferBlockHash: string,
  ): Promise<BigNumber> {
    // TODO check eth_getTransactionReceipt to check txn is valid or not
    try {
      const contractAddress = this.dst20TokenService.getAddressFromDST20TokenId(tokenId);
      // get block details by hash
      const transferBlockDetails = await this.evmProviderService.evmRpc('eth_getBlockByHash', [
        transferBlockHash,
        true,
      ]);
      // convert block number from hex to decimal
      const transferBlockNumber = new BigNumber(transferBlockDetails.number, 16);
      // get balance at current block
      const currentBalance = await this.dst20TokenService.getBalanceOf(
        contractAddress,
        address,
        transferBlockNumber.toNumber(),
      );
      // get balance at previous block
      const prevBalance = await this.dst20TokenService.getBalanceOf(
        contractAddress,
        address,
        transferBlockNumber.minus(1).toNumber(),
      );
      // get balance movement at current block txn
      const movement = await this.getDST20BalanceMovementOnBlock(
        contractAddress,
        address,
        transferBlockDetails.transactions,
      );
      const blockBalanceDiff = new BigNumber(currentBalance).minus(prevBalance);
      return blockBalanceDiff.plus(movement);
    } catch (err) {
      this.logger.error(err);
      throw new Error(err.message);
    }
  }
}
