import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
// import { MyLogger } from './helpers/MyLogger';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import helmet from 'helmet';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('server.key'),
    cert: readFileSync('server.cert'),
  };

  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
    httpsOptions,
    abortOnError: false, // make sure the app will throw error instead of disable
  });

  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(compression());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
