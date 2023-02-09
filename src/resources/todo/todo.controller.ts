import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CustomLogger } from '../../logger/custom-logger.service';

@ApiTags('To-Do App')
@Controller()
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.setContext(TodoController.name);
  }

  @Post('create-task')
  create(@Body() createTodoDto: CreateTodoDto) {
    const methodName = this.create.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.create(createTodoDto);
  }

  @Get('search/pending')
  pendingTasks() {
    const methodName = this.pendingTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.pendingTasks();
  }

  @Get('search/done')
  finishedTasks() {
    const methodName = this.finishedTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.finishedTasks();
  }

  @Get('find/:id')
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.findOne.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.update.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.update(id);
  }

  @Patch('update/soft-delete/retrieve/:id')
  retrieve(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.retrieve.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.retrieve(id);
  }

  @Delete('delete/:softDelete?/:id')
  remove(
    @Param('id') id: mongoose.Types.ObjectId,
    @Param('softDelete') softDelete?: boolean,
  ) {
    const methodName = this.remove.name;
    this.customLogger.log(`[${methodName}] init`);
    const soft_delete = softDelete ? true : false;
    return this.todoService.remove(id, soft_delete);
  }
}
