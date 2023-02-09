import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

import { CustomLogger } from '../../logger/custom-logger.service';
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
    const methodName = this.create.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.save(createTodoDto);
  }

  pendingTasks() {
    const methodName = this.pendingTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.findTasks(false);
  }

  finishedTasks() {
    const methodName = this.finishedTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.findTasks(true);
  }

  findOne(id: mongoose.Types.ObjectId) {
    const methodName = this.findOne.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.findOne(id);
  }

  update(id: mongoose.Types.ObjectId, updateTodoDto: UpdateTodoDto) {
    const methodName = this.update.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.update(id, updateTodoDto);
  }

  retrieve(id: mongoose.Types.ObjectId) {
    const methodName = this.retrieve.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoRepository.retrieve(id);
  }

  remove(id: mongoose.Types.ObjectId, sofDelete: boolean) {
    if (sofDelete) {
      const methodName = this.remove.name;
      this.customLogger.log(`[${methodName}][sofDelete=${sofDelete}] init`);
    } else {
      const methodName = this.remove.name;
      this.customLogger.log(`[${methodName}] init`);
    }
    return this.todoRepository.remove(id, sofDelete);
  }
}
