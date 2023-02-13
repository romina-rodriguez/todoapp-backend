import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsMongoId,
  IsDateString,
} from 'class-validator';
import mongoose from 'mongoose';

export class ResponseTaskDto {
  @ApiProperty({
    description: 'Unique mongo identifier of the new task',
    example: '63e3b3d44ed62e2f3c747952',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'New task added to the checklist',
    example: 'Sleep',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({
    description: 'Boolean that indicates wether the task is done or not',
    example: false,
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was created',
    example: '2023-02-08T14:38:12.679Z',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was updated',
    example: '2023-02-10T12:40:29.831Z',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: string;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was soft deleted',
    example: '2023-02-10T12:40:29.831Z',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  isDeleted: string;

  @ApiProperty({
    description: 'Number that indicates the version key of the task object',
    example: 0,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  __v: number;
}
