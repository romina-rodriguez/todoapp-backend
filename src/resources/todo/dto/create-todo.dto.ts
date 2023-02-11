import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'New task description',
    example: 'Sleep',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({
    description: 'Status boolean that indicates wether the task is done or not',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
