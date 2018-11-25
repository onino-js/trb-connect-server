import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  const options = new DocumentBuilder()
    .setTitle('Main API Service')
    .setDescription('MyLight API Services')
    .setVersion('1.0')
    .addBearerAuth('bearer', 'header', 'apiKey')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
