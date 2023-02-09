import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CustomLogger } from '../../../logger/custom-logger.service';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.schema';

describe('TodoRepository', () => {
  let repository: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoRepository,
        CustomLogger,
        { provide: getModelToken(Todo.name), useValue: jest.fn() },
      ],
    }).compile();

    repository = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
