import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsDate,
} from 'class-validator';
import mongoose from 'mongoose';

export class ResponseTaskDto {
  @ApiProperty({
    description: 'Unique mongo id identifier of the new task',
    type: mongoose.Types.ObjectId,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  _id: mongoose.Types.ObjectId;

  @ApiProperty({
    description: 'New task added to the checklist',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({
    description: 'Boolean that indicates wether the task is done or not',
    type: Boolean,
    required: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was created',
    type: Date,
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was updated',
    type: Date,
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: 'Timestamp that indicates when the task was soft deleted',
    type: Date,
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  isDeleted: Date;

  @ApiProperty({
    description: 'Number that indicates the version key of the task object',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  __v: number;
}
