import * as dotenv from 'dotenv';
dotenv.config(); //carga de variables de entorno

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Habilita CORS
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during application startup', error);
  }
}
bootstrap();
