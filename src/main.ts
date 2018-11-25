import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  // app.set('views', join(__dirname, 'public'));
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  // app.use(express.static(join(__dirname, 'public')));

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
