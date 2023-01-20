import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './resources/todo/todo.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todoapp'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
