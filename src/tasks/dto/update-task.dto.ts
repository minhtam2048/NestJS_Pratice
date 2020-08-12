import { IsNotEmpty, MinLength ,MaxLength, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../shared/enums/task-status.enum';

export class UpdateTaskDTO {
  
  @IsNotEmpty({
    message: 'Title cannot be empty'
  })
  @MinLength(7, {
    message: 'Title is too short'
  })
  @MaxLength(100, {
    message: 'Title is too long'
  })
  title: string;
  
  @IsString({
    message: 'Invalid'
  })
  description: string;
  
  @IsEnum(TaskStatus)
  status: TaskStatus
}