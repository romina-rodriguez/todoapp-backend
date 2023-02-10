import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Task description to be updated',
    type: String,
    required: false,
  })
  @IsString()
  task?: string;

  @ApiProperty({
    description: 'Status boolean to be updated',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  done?: boolean;
}
