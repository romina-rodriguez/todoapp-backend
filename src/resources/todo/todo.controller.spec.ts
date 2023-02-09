import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomLogger } from '../../logger/custom-logger.service';
import { TodoRepository } from './schema/todo.repository';
import { Todo } from './schema/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        TodoRepository,
        CustomLogger,
        { provide: getModelToken(Todo.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
