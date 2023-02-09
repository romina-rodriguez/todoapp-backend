import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class updateTodoDto {
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
