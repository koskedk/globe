import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 4701,
    },
  });
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

bootstrap();
