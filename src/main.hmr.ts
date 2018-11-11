import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  await app.listen(process.env.port || 3004);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
