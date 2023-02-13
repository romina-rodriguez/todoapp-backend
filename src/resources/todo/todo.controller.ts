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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { CustomLogger } from '../../common/logger/custom-logger.service';
import { ResponseTaskDto } from './dto/response-task.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ObjectIdValidationPipe } from '../../common/pipes/object-id-validation.pipe';

@ApiTags('To-Do')
@Controller()
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.setContext(TodoController.name);
  }

  @Post('')
  @ApiOperation({
    summary: 'Creates a new task',
  })
  @ApiBody({
    description: 'Enter the new task data',
    type: CreateTodoDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Shows user the new task object created',
    type: ResponseTaskDto,
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    this.customLogger.setMethodName(this.create.name);
    this.customLogger.log(`Init`);
    return this.todoService.create(createTodoDto);
  }

  @Get('pending')
  @ApiOperation({
    summary: 'Returns all pending tasks',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user an array containing all pending tasks objects',
    type: [ResponseTaskDto],
  })
  pendingTasks() {
    this.customLogger.setMethodName(this.pendingTasks.name);
    this.customLogger.log(`Init`);
    return this.todoService.pendingTasks();
  }

  @Get('done')
  @ApiOperation({
    summary: 'Returns all finished tasks',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user an array containing all finished tasks objects',
    type: [ResponseTaskDto],
  })
  finishedTasks() {
    this.customLogger.setMethodName(this.finishedTasks.name);
    this.customLogger.log(`Init`);
    return this.todoService.finishedTasks();
  }

  @Get(':id')
  @ApiHeader({
    name: '_id',
    description: 'Task ObjectId',
  })
  @ApiOperation({
    summary: 'Returns one task by its id',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user the task object they were looking for',
    type: ResponseTaskDto,
  })
  findOne(@Param('id', ObjectIdValidationPipe) id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.findOne.name);
    this.customLogger.log(`Init`);
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({
    name: '_id',
    description: 'Task ObjectId',
  })
  @ApiOperation({
    summary: 'Updates one task by its id',
  })
  @ApiBody({
    description: 'Enter the task data to be updated',
    type: UpdateTodoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user the updated task object',
    type: ResponseTaskDto,
  })
  update(
    @Param('id', ObjectIdValidationPipe) id: mongoose.Types.ObjectId,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    this.customLogger.setMethodName(this.update.name);
    this.customLogger.log(`Init`);
    return this.todoService.update(id, updateTodoDto);
  }

  @Patch('retrieve/:id')
  @ApiHeader({
    name: '_id',
    description: 'Task ObjectId',
  })
  @ApiOperation({
    summary:
      'Updates one task by its id, changing its isDeleted attribute to false',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user the updated task object',
    type: ResponseTaskDto,
  })
  retrieve(@Param('id', ObjectIdValidationPipe) id: mongoose.Types.ObjectId) {
    this.customLogger.setMethodName(this.retrieve.name);
    this.customLogger.log(`Init`);
    return this.todoService.retrieve(id);
  }

  @Delete(':softDelete?/:id')
  @ApiHeader({
    name: '_id',
    description: 'Task ObjectId',
  })
  @ApiOperation({
    summary:
      'Deletes one task by its id, or updates it changing its isDeleted attribute to true when soft deletion is on',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user deleted/updated task object',
    type: ResponseTaskDto,
  })
  remove(
    @Param('id', ObjectIdValidationPipe) id: mongoose.Types.ObjectId,
    @Param('softDelete') softDelete?: boolean,
  ) {
    this.customLogger.setMethodName(this.remove.name);
    this.customLogger.log(`Init`);
    const soft_delete = softDelete ? true : false;
    return this.todoService.remove(id, soft_delete);
  }
}
