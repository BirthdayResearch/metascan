import { AppModule } from './app.module';
import {MetascanServerApp} from "./MetascanServerApp";

async function bootstrap() {
  const app = new MetascanServerApp(AppModule)
  await app.start();
}
void bootstrap();
