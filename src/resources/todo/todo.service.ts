import { Injectable, Logger } from '@nestjs/common';
import mongoose from 'mongoose';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './schema/todo.repository';

@Injectable()
export class TodoService {
  private logger = new Logger(TodoService.name);

  constructor(private todoRepository: TodoRepository) {}

  create(createTodoDto: CreateTodoDto) {
    this.logger.verbose('Created to-do task');
    return this.todoRepository.save(createTodoDto);
  }

  pendingTasks() {
    this.logger.verbose('Found all pending tasks');
    return this.todoRepository.findTasks(false);
  }

  finishedTasks() {
    this.logger.verbose('Found all finished tasks');
    return this.todoRepository.findTasks(true);
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    this.logger.verbose(`Returned task with id: ${id}`);
    return this.todoRepository.findOne(id);
  }

  update(id: mongoose.Schema.Types.ObjectId) {
    this.logger.verbose(`Updated status of task with id: ${id}`);
    return this.todoRepository.update(id);
  }

  retrieve(id: mongoose.Schema.Types.ObjectId) {
    this.logger.verbose(`Retrieved previously deleted task with id: ${id}`);
    return this.todoRepository.retrieve(id);
  }

  remove(id: mongoose.Schema.Types.ObjectId, sofDelete: boolean) {
    if (sofDelete) {
      this.logger.verbose(`Soft deleted task with id: ${id}`);
    } else {
      this.logger.verbose(`Deleted task with id: ${id}`);
    }
    return this.todoRepository.remove(id, sofDelete);
  }
}
