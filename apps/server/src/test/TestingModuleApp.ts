import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from '../app.module';
import { AppConfig } from '../AppConfig';

@Module({})
export class TestingModuleApp {
  static register(config: AppConfig): DynamicModule {
    return {
      module: TestingModuleApp,
      imports: [AppModule, ConfigModule.forFeature(() => config)],
    };
  }
}

export type BuildTestConfigParams = {
  faucetAmountPerRequest: string;
  throttleTimePerAddress: string;
  privateKey: string;
};
