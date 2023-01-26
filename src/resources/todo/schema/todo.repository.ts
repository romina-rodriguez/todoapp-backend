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

  async findTasks(status: boolean) {
    //TODO: Add pagination
    return await this.todoModel.find({ done: status });
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const request: ITodo | null = await this.todoModel.findById(id);
      return request;
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.todoModel.findByIdAndUpdate(id, {
        done: { $eq: [false, '$done'] },
      });
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async retrieve(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.todoModel.findByIdAndUpdate(id, { isDeleted: false });
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId, sofDelete: boolean) {
    try {
      if (sofDelete) {
        return this.todoModel.findByIdAndUpdate(id, { isDeleted: true });
      } else {
        return this.todoModel.findByIdAndDelete(id);
      }
    } catch (error) {
      throw new NotFoundException(`A task with id: ${id} does not exist`);
    }
  }
}
