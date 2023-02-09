import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'New task to add to the checklist',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({
    description: 'Status boolean that indicates wether the task is done or not',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  done?: boolean;
}
