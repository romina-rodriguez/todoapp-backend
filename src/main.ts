import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { CustomLogger } from './logger/custom-logger.service';

@Injectable()
class Main {
  private origin: string[];
  private port: number;
  private env: string;

  constructor(
    private configService: ConfigService,
    private customLogger: CustomLogger,
  ) {
    this.origin = (
      this.configService.get<string>('ORIGIN') || 'http://localhost:3001'
    ).split(',');
    this.port = this.configService.get<number>('PORT') || 3015;
    this.env = this.configService.get<string>('ENV') || 'dev';
    this.customLogger.setContext(Main.name);
  }

  async bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: this.env === 'prod' ? ['log', 'warn', 'error'] : ['debug'],
    });
    app.enableCors({
      origin: (origin: string, callback: any) => {
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
    this.customLogger.log(
      `🚀 Application is running on: http://localhost:${this.port}`,
    );
  }
}

const main = new Main(new ConfigService(), new CustomLogger());
main.bootstrap();
