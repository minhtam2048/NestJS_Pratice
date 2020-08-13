import { TaskStatus } from "src/shared/enums/task-status.enum";
import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";

export class TaskFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  readonly search: string;
}