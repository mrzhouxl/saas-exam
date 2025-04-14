import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as httpContext from 'express-http-context'
import { ValidationPipe } from '@nestjs/common';
import * as _ from 'lodash';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalThis._ = _;
  app.setGlobalPrefix('/admin')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe)//新加
  app.use(httpContext.middleware)
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('exam')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
  console.log('http://localhost:5000')
  console.log('http://localhost:5000/api')
}
bootstrap();
