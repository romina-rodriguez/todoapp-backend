import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ResourcesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
