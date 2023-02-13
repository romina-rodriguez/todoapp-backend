import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CustomLogger } from '../../../common/logger/custom-logger.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { ITodo } from '../interface/todo.interface';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.setContext(TodoRepository.name);
  }

  async save(createTodoDto: CreateTodoDto) {
    this.customLogger.setMethodName(this.save.name);
    this.customLogger.log(`Init, saving data...`);
    const request: ITodo = await this.todoModel.create(createTodoDto);
    this.customLogger.log(`Success`);
    return request;
  }

  async findTasks(status: boolean) {
    this.customLogger.setMethodName(this.findTasks.name);
    this.customLogger.log(`Init, querying data...`);
    const request: ITodo[] = await this.todoModel.find({ done: status });
    this.customLogger.log(`Success`);
    return request;
  }

  async findOne(id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.findOne.name);
    this.customLogger.log(`Init, querying data...`);
    const request: ITodo | null = await this.todoModel.findById(id);
    request === null
      ? this.customLogger.error(`A task object with id "${id}" does not exist`)
      : this.customLogger.log(`Success`);
    return request;
  }

  async update(id: mongoose.Types.ObjectId, updateTodoDto: UpdateTodoDto) {
    this.customLogger.setMethodName(this.update.name);
    this.customLogger.log(`Init, updating data...`);
    const request: ITodo | null = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
      { new: true },
    );
    request === null
      ? this.customLogger.error(`A task object with id "${id}" does not exist`)
      : this.customLogger.log(`Success`);
    return request;
  }

  async retrieve(id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.retrieve.name);
    this.customLogger.log(`Init, updating data...`);
    const request: ITodo | null = await this.todoModel.findByIdAndUpdate(id, {
      isDeleted: false,
    });
    request === null
      ? this.customLogger.error(`A task object with id "${id}" does not exist`)
      : this.customLogger.log(`Success`);
    return request;
  }

  async remove(id: mongoose.Types.ObjectId, sofDelete: boolean) {
    this.customLogger.setMethodName(this.remove.name);
    this.customLogger.log(`Init, removing data...`);
    if (sofDelete) {
      const request: ITodo | null = await this.todoModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
      );
      request === null
        ? this.customLogger.error(
            `A task object with id "${id}" does not exist`,
          )
        : this.customLogger.log(`Success`);
      return request;
    } else {
      const request: ITodo | null = await this.todoModel.findByIdAndDelete(id);
      request === null
        ? this.customLogger.error(
            `A task object with id "${id}" does not exist`,
          )
        : this.customLogger.log(`Success`);
      return request;
    }
  }
}
