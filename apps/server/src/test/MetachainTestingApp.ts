import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';

import { BuildTestConfigParams, TestingModuleApp } from './TestingModuleApp';

/**
 * Testing app used for testing Server App behaviour through integration tests
 */
export class MetachainTestingApp {
  app: NestFastifyApplication;

  async createTestingModule(config: BuildTestConfigParams): Promise<TestingModule> {
    const dynamicModule = TestingModuleApp.register(config);
    return Test.createTestingModule({
      imports: [dynamicModule],
    })
    .compile();
  }

  async createNestApp(config: BuildTestConfigParams): Promise<NestFastifyApplication> {
    const module = await this.createTestingModule(config);
    this.app = module.createNestApplication<NestFastifyApplication>();
    await new Promise(setImmediate);

    return this.app;
  }

  async start(): Promise<NestFastifyApplication> {
    return this.app.init();
  }

  async stop(): Promise<void> {
    await this.app.close();
    this.app = undefined;
  }
}
