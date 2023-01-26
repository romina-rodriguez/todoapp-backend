import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

@Injectable()
class Main {
  private origin;
  private port;
  private logger;

  constructor(private configService: ConfigService) {
    this.origin = (
      this.configService.get<string>('ORIGIN') || 'http://localhost:3001'
    ).split(',');
    this.port = this.configService.get<number>('PORT') || 3015;
    this.logger = new Logger(Main.name);
  }

  async bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: ['debug', 'error', 'log', 'verbose', 'warn'],
    });
    app.enableCors({
      origin: (origin: any, callback: any) => {
        if (this.origin.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new InternalServerErrorException('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });

    const config = new DocumentBuilder()
      .setTitle('To-Do App - API')
      .setDescription('To-Do App API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(this.port);
    this.logger.verbose(
      `🚀 Application is running on: http://localhost:${this.port}`,
    );
  }
}

const main = new Main(new ConfigService());
main.bootstrap();
