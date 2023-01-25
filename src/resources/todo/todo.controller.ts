import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('To-Do App')
@Controller()
export class TodoController {
  private logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get('pending')
  pendingTasks() {
    return this.todoService.pendingTasks();
  }

  @Get('done')
  finishedTasks() {
    return this.todoService.finishedTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.remove(id);
  }
}
