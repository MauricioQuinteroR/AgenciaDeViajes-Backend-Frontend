import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();  // Carga las variables de entorno antes de iniciar la aplicación
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
