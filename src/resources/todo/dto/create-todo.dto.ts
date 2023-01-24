import { IsNotEmpty, IsString, IsBoolean, IsDate } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
