import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Task description to be updated',
    example: 'Sleep',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  task?: string;

  @ApiProperty({
    description: 'Status boolean to be updated',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
