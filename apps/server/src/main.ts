import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5741;
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  app.listen(PORT).then(() => {
    // eslint-disable-next-line no-console
    console.log(`Started server on port ${PORT}`);
  });
}
void bootstrap();
