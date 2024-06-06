import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false, // make sure the app will throw error instead of disable
  });
  await app.listen(3000);
}
bootstrap();
