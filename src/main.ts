import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  app.setGlobalPrefix('api/v1/');
  const PORT = process.env.PORT ?? 3300;
  const HOST = process.env.HOST ?? 'localhost';
  await app.listen(PORT, HOST, () => {
    console.log(`NestJS App is running on port http://${HOST}:${PORT}`);
  });
}
bootstrap();
