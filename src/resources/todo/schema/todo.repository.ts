import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CustomLogger } from '../../../logger/custom-logger.service';
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
    const methodName = this.save.name;
    this.customLogger.log(`[${methodName}] Init, saving data...`);
    const request: ITodo = await this.todoModel.create(createTodoDto);
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async findTasks(status: boolean) {
    const methodName = this.findTasks.name;
    this.customLogger.log(`[${methodName}] Init, querying data...`);
    const request: ITodo[] = await this.todoModel.find({ done: status });
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async findOne(id: mongoose.Types.ObjectId) {
    const methodName = this.findOne.name;
    this.customLogger.log(`[${methodName}] Init, querying data...`);
    const request: ITodo | null = await this.todoModel.findOne({ _id: id });
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async update(id: mongoose.Types.ObjectId, updateTodoDto: UpdateTodoDto) {
    const methodName = this.update.name;
    this.customLogger.log(`[${methodName}] Init, updating data...`);
    const request: ITodo | null = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
      { new: true },
    );
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async retrieve(id: mongoose.Types.ObjectId) {
    const methodName = this.retrieve.name;
    this.customLogger.log(`[${methodName}] Init, updating data...`);
    const request: ITodo | null = await this.todoModel.findByIdAndUpdate(id, {
      isDeleted: false,
    });
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async remove(id: mongoose.Types.ObjectId, sofDelete: boolean) {
    const methodName = this.remove.name;
    this.customLogger.log(`[${methodName}] Init, removing data...`);
    if (sofDelete) {
      const request: ITodo | null = await this.todoModel.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { new: true },
      );
      this.customLogger.log(`[${methodName}] success`);
      return request;
    } else {
      const request: ITodo | null = await this.todoModel.findByIdAndDelete(id);
      this.customLogger.log(`[${methodName}] success`);
      return request;
    }
  }
}
