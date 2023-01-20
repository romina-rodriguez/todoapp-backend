import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateTodoDto } from '../dto/create-todo.dto';
import { ITodo } from '../interface/todo.interface';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoRepository {
  private logger = new Logger(TodoRepository.name);

  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async save(request: CreateTodoDto) {
    try {
      return await this.todoModel.create(request);
    } catch (error) {
      throw new InternalServerErrorException('Error saving task in MongoDB');
    }
  }

  async pendingTasks() {
    return await this.todoModel.find({ done: false }).sort({ date: 'asc' });
  }

  async finishedTasks() {
    return await this.todoModel.find({ done: true }).sort({ date: 'desc' });
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const request: ITodo | null = await this.todoModel.findById(id);
      return request;
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist.`);
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.todoModel.updateOne({ _id: id }, [
        { $set: { done: { $eq: [false, '$done'] }, date: Date.now() } },
      ]);
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist.`);
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    try {
      return this.todoModel.deleteOne({ _id: id });
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist.`);
    }
  }
}
