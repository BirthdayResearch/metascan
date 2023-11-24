import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

/**
 * App which starts the default Metascan Server Application
 */
export class MetascanServerApp<App extends NestFastifyApplication = NestFastifyApplication> {
  protected app?: App;

  constructor(protected readonly module: any) {}

  async createNestApp(): Promise<App> {
    const app = await NestFactory.create(AppModule);
    await this.configureApp(app);
    // @ts-ignore
    return app;
  }

  async configureApp(app): Promise<void> {
    app.enableCors({
      allowedHeaders: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      maxAge: 60 * 24 * 7,
      origin: '*'
        // process.env.NODE_ENV === 'production'
        //   ? [
        //       'https://meta.defiscan.live',
        //       /https:\/\/([^.]*.\.)*defimetascan\.app/, // allow all subdomains of defimetascan
        //       /https:\/\/([^.]*.)--defimetascan\.netlify\.app/, // allow all netlify preview deployments
        //       /https?:\/\/localhost(:\d+)?/, // allow localhost connection
        //     ]
        //   : '*',
    });
  }

  /**
   * Run any additional initialisation steps before starting the server.
   * If there are additional steps, can be overriden by any extending classes
   */
  async init() {
    this.app = await this.createNestApp();
    return this.app.init();
  }

  async start(): Promise<App> {
    const app = await this.init();

    const PORT = process.env.PORT || 3001;
    await app.listen(PORT).then(() => {
      // eslint-disable-next-line no-console
      console.log(`Started server on port ${PORT}`);
    });
    return app;
  }

  /**
   * Stop NestJs and un-assign this.app
   */
  async stop(): Promise<void> {
    await this.app?.close();
    this.app = undefined;
  }
}
