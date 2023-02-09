import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './schema/todo.schema';
import { TodoRepository } from './schema/todo.repository';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    LoggerModule,
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
