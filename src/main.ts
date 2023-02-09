import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { CustomLogger } from './logger/custom-logger.service';

class Main {
  private origin: string[];
  private port: number;
  private env: string;
  private globalPrefix: string;

  constructor(
    private configService: ConfigService,
    private customLogger: CustomLogger,
  ) {
    this.origin = (
      this.configService.get<string>('ORIGIN') || 'http://localhost:3001'
    ).split(',');
    this.port = this.configService.get<number>('PORT') || 3015;
    this.env = this.configService.get<string>('ENV') || 'dev';
    this.globalPrefix = this.configService.get<string>('PREFIX') || 'api';
    this.customLogger.setContext(Main.name);
  }

  async bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: this.env === 'prod' ? ['log', 'warn', 'error'] : ['debug'],
    });
    app.setGlobalPrefix(this.globalPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableCors({
      origin: (
        origin: string,
        callback: (err: Error | null, allow?: boolean) => void,
      ) => {
        if (this.origin.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new InternalServerErrorException('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });

    const config = new DocumentBuilder()
      .setTitle('To-Do App API')
      .setDescription('To-Do App API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${this.globalPrefix}/docs`, app, document);

    await app.listen(this.port);
    this.customLogger.log(
      `🚀 Application is running on: http://localhost:${this.port}/${this.globalPrefix}`,
    );
  }
}

const main = new Main(new ConfigService(), new CustomLogger());
main.bootstrap();
