import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { HttpException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EnvironmentNetwork } from '@waveshq/walletkit-core';
import { TransactionResponse } from 'ethers';
import * as request from 'supertest';

import { FaucetController } from '../faucet/FaucetController';
import { FaucetService } from '../faucet/FaucetService';


describe('FaucetController (e2e)', () => {
  let app;
  let cacheManager;
  let faucetService;
  const faucetAmountPerRequest = '0.1';
  const throttleTimePerAddress = 3600;
  const evmAddress = '0x9f1FF3f9A4F99f39Ec7F799F90e54bfC88B43FFA';
  const evmPrivateKey = "0x814233c91d926169e9a6817db4de4f325cee91639ff6cfce74029ec9e568d2ad"
  const network = EnvironmentNetwork.LocalPlayground;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(() => ({ 
          faucetAmountPerRequest,
          throttleTimePerAddress,
          privateKey: evmPrivateKey,
        })),
        ThrottlerModule.forRoot([{
          ttl: 60_000, // Throttle time window set to 60 seconds
          limit: 10, // Maximum 10 requests allowed within the time window
        }]),
        CacheModule.register(),
      ],
      controllers: [FaucetController],
      providers: [
        FaucetService,
        ConfigService,
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    cacheManager = app.get(CACHE_MANAGER);
    faucetService = app.get(FaucetService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and the expected response for valid request', async () => {
    const mockTransactionResponse = {} as TransactionResponse;
    jest.spyOn(faucetService, 'sendFundsToUser').mockResolvedValueOnce(mockTransactionResponse);

    await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockTransactionResponse);
      });
  });

  it('should return 403 for repeated requests from the same address', async () => {
    const mockedKey = `FAUCET_${evmAddress}_${network}`;
    // Mock the cacheManager to return true, simulating a cached response
    jest.spyOn(cacheManager, 'get').mockImplementation(async (key) => {
      if (key === mockedKey) {
        return true;
      }
      return null;
    });

    const response = await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(403);

    // Check the error message in the response body
    expect(response.body.message).toBe('Transfer already done, pleas try again later.');

    // Check if the cacheManager get method was called with the correct key
    expect(cacheManager.get).toHaveBeenCalledWith(mockedKey);
  });

  it('should cache the response for a request and return the cached response for subsequent requests within the TTL', async () => {
    const mockedKey = `FAUCET_${evmAddress}_${network}`;
    const mockTransactionResponse = {} as TransactionResponse;
    jest.spyOn(faucetService, 'sendFundsToUser').mockResolvedValueOnce(mockTransactionResponse);
    const mockCacheGet = jest.spyOn(cacheManager, 'get').mockImplementation(() => null);
    const mockCacheSet = jest.spyOn(cacheManager, 'set').mockResolvedValue(true);

    await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(200);

      expect(mockCacheGet).toHaveBeenCalledWith(mockedKey);
      expect(mockCacheSet).toHaveBeenCalledWith(mockedKey, true, { ttl: throttleTimePerAddress });
  });

  it('should not cache the response for a request if the response is not successful', async () => {
    const mockedKey = `FAUCET_${evmAddress}_${network}`;
    const mockCacheGet = jest.spyOn(cacheManager, 'get').mockImplementation(() => null);
    jest.spyOn(faucetService, 'sendFundsToUser').mockRejectedValue(new HttpException('Error', 500));
    const mockCacheSet = jest.spyOn(cacheManager, 'set').mockResolvedValue(true);
    await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(500);

    expect(mockCacheGet).toHaveBeenCalledWith(mockedKey);
    expect(mockCacheSet).not.toHaveBeenCalled();
  });

  it('should reset the cache after the TTL expires', async () => {
    const mockedKey = `FAUCET_${evmAddress}_${network}`;
    // Mock the cacheManager to return true, simulating a cached response
    jest.spyOn(cacheManager, 'get').mockImplementation(async (key) => {
      if (key === mockedKey) {
        return false;
      }
      return null;
    });
    const mockTransactionResponse = {} as TransactionResponse;

    jest.spyOn(faucetService, 'sendFundsToUser').mockResolvedValueOnce(mockTransactionResponse);

    await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockTransactionResponse);
      });
  });

  it('should throttle requests from the same address within the throttle time frame', async () => {
    const mockedKey = `FAUCET_${evmAddress}_${network}`;
    const mockTransactionResponse = {} as TransactionResponse;
  
    // Mock the cacheManager to return false for the first request and true for subsequent requests
    let callCount = 0;
    jest.spyOn(cacheManager, 'get').mockImplementation(async (key) => {
      if (key === mockedKey) {
        callCount += 1;
        return callCount > 1;
      }
      return null;
    });
    jest.spyOn(faucetService, 'sendFundsToUser').mockResolvedValueOnce(mockTransactionResponse);
    // Make multiple requests within the throttle time frame
    const response1 = await request(app.getHttpServer())
      .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(200);
  
    const response2 = await request(app.getHttpServer())
    .get(`/faucet/${evmAddress}?network=${network}`)
      .expect(403);
  
    // Check the response body and status codes
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(403);
    expect(cacheManager.get).toHaveBeenCalledWith(mockedKey);
    expect(cacheManager.get).toHaveBeenCalledTimes(2)
  });

  it('should throttle requests from the same IP address within the throttle time frame', async () => {
    // Wait for the throttle time frame to expire
    await sleep(60_000);
    const mockTransactionResponse = {} as TransactionResponse;
    jest.spyOn(faucetService, 'sendFundsToUser').mockResolvedValue(mockTransactionResponse);
    jest.spyOn(cacheManager, 'get').mockImplementation(() => null);
    for (let i = 0; i < 10; i += 1) {
      await request(app.getHttpServer()).get(`/faucet/${evmAddress}?network=${network}`).expect(200)
    }
    // Make multiple requests from the same IP address within the throttle time frame
    await request(app.getHttpServer()).get(`/faucet/${evmAddress}?network=${network}`).expect(429)
    // Wait for the throttle time frame to expire
    await sleep(60_000);
    // Make a new request after the throttle time frame has passed
    await request(app.getHttpServer()).get(`/faucet/${evmAddress}?network=${network}`).expect(200);
  });
});

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
});
