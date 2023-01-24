import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });
  app.enableCors({
    origin: [`${process.env.TODOAPP_FRONTEND}`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(3015);
}
bootstrap();
