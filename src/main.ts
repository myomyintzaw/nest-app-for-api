import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  app.enableCors(); //**cors */
  app.use(helmet()); //*security
  app.setGlobalPrefix('api/v1/');
  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = process.env.PORT ?? 3300;
  const HOST = process.env.HOST ?? 'localhost';
  await app.listen(PORT, HOST, () => {
    console.log(`NestJS App is running on port http://${HOST}:${PORT}`);
  });
}
bootstrap();
