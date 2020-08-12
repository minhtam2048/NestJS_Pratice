import { IsNotEmpty, MinLength ,MaxLength, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../shared/enums/task-status.enum';

export class CreateTaskDTO {
  
  @IsString({
    message: 'Invalid'
  })
  @IsNotEmpty({
    message: 'Title cannot be empty'
  })
  @MinLength(7, {
    message: 'Title is too short'
  })
  @MaxLength(100, {
    message: 'Title is too long'
  })
  readonly title: string;
  
  @IsString({
    message: 'Invalid'
  })
  readonly description: string;
  
  @IsEnum(TaskStatus)
  readonly status: TaskStatus
}