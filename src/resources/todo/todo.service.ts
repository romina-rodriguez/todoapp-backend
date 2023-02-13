import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

import { CustomLogger } from '../../common/logger/custom-logger.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './schema/todo.repository';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.setContext(TodoService.name);
  }

  create(createTodoDto: CreateTodoDto) {
    this.customLogger.setMethodName(this.create.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.save(createTodoDto);
  }

  pendingTasks() {
    this.customLogger.setMethodName(this.pendingTasks.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.findTasks(false);
  }

  finishedTasks() {
    this.customLogger.setMethodName(this.finishedTasks.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.findTasks(true);
  }

  findOne(id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.findOne.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.findOne(id);
  }

  update(id: mongoose.Types.ObjectId, updateTodoDto: UpdateTodoDto) {
    this.customLogger.setMethodName(this.update.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.update(id, updateTodoDto);
  }

  retrieve(id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.retrieve.name);
    this.customLogger.log(`Init`);
    return this.todoRepository.retrieve(id);
  }

  remove(id: mongoose.Types.ObjectId, sofDelete: boolean) {
    if (sofDelete) {
      this.customLogger.setMethodName(
        `${this.remove.name}/sofDelete=${sofDelete}`,
      );
      this.customLogger.log(`Init`);
    } else {
      this.customLogger.setMethodName(this.remove.name);
      this.customLogger.log(`Init`);
    }
    return this.todoRepository.remove(id, sofDelete);
  }
}
