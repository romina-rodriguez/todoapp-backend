import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

@Injectable()
class Main {
  private origin;

  constructor(private configService: ConfigService) {
    this.origin =
      this.configService.get<string>('ORIGIN') || 'http://localhost:300';
  }

  async bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    });
    app.enableCors({
      origin: [this.origin],
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });

    const config = new DocumentBuilder()
      .setTitle('To-Do App - API')
      .setDescription('To-Do App API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3015);
  }
}

const main = new Main(new ConfigService());
main.bootstrap();
