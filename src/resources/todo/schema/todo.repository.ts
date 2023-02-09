import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CustomLogger } from '../../../logger/custom-logger.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
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
    this.customLogger.log(`[${methodName}] init, saving data...`);
    const request: ITodo = await this.todoModel.create(createTodoDto);
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async findTasks(status: boolean) {
    const methodName = this.findTasks.name;
    this.customLogger.log(`[${methodName}] init, querying data...`);
    const request: ITodo[] = await this.todoModel.find({ done: status });
    this.customLogger.log(`[${methodName}] success`);
    return request;
  }

  async findOne(id: mongoose.Types.ObjectId) {
    try {
      const request: ITodo | null = await this.todoModel.findOne({ _id: id });
      return request;
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async update(id: mongoose.Types.ObjectId) {
    try {
      const request: ITodo | null = await this.todoModel.findByIdAndUpdate(id, {
        done: true,
      });
      return request;
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async retrieve(id: mongoose.Types.ObjectId) {
    try {
      return await this.todoModel.findByIdAndUpdate(id, { isDeleted: false });
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async remove(id: mongoose.Types.ObjectId, sofDelete: boolean) {
    try {
      if (sofDelete) {
        const request: ITodo | null = await this.todoModel.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true },
        );
        return request;
      } else {
        return this.todoModel.findByIdAndDelete(id);
      }
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }
}
