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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CustomLogger } from '../../logger/custom-logger.service';
import { ResponseTaskDto } from './dto/response-task.dto';

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
  @ApiOperation({
    summary: 'Creates a new task to add to the existing checklist',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user the new task object created',
    type: ResponseTaskDto,
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    const methodName = this.create.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.create(createTodoDto);
  }

  @Get('search/pending')
  @ApiOperation({
    summary: 'Returns all pending tasks',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user an array containing all pending tasks',
    type: [ResponseTaskDto],
  })
  pendingTasks() {
    const methodName = this.pendingTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.pendingTasks();
  }

  @Get('search/done')
  @ApiOperation({
    summary: 'Returns all finished tasks',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user an array containing all finished tasks',
    type: [ResponseTaskDto],
  })
  finishedTasks() {
    const methodName = this.finishedTasks.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.finishedTasks();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Returns one task searched by its id',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user the task object they were looking for',
    type: ResponseTaskDto,
  })
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.findOne.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Updates one task by its id',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user the updated task',
    type: ResponseTaskDto,
  })
  update(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.update.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.update(id);
  }

  @Patch('update/soft-delete/retrieve/:id')
  @ApiOperation({
    summary:
      'Updates one task by its id, changing its isDeleted attribute to false',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user the updated task',
    type: ResponseTaskDto,
  })
  retrieve(@Param('id') id: mongoose.Types.ObjectId) {
    const methodName = this.retrieve.name;
    this.customLogger.log(`[${methodName}] init`);
    return this.todoService.retrieve(id);
  }

  @Delete('delete/:softDelete?/:id')
  @ApiOperation({
    summary:
      'Deletes one task by its id, or updates it changing its isDeleted attribute to true when soft deletion is on',
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user deleted/updated task',
    type: ResponseTaskDto,
  })
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
