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

  @Post('create-task')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get('search/pending')
  pendingTasks() {
    return this.todoService.pendingTasks();
  }

  @Get('search/done')
  finishedTasks() {
    return this.todoService.finishedTasks();
  }

  @Get('find/:id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.findOne(id);
  }

  @Patch('update/done/:id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.update(id);
  }

  @Patch('update/soft-delete/retrieve/:id')
  retrieve(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.todoService.retrieve(id);
  }

  @Delete('delete/:softDelete?/:id')
  remove(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Param('softDelete') softDelete?: boolean,
  ) {
    const soft_delete = softDelete ? true : false;
    return this.todoService.remove(id, soft_delete);
  }
}
