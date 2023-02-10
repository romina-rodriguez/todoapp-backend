import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomLogger } from '../../common/logger/custom-logger.service';
import { TodoRepository } from './schema/todo.repository';
import { Todo } from './schema/todo.schema';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        TodoRepository,
        CustomLogger,
        { provide: getModelToken(Todo.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
