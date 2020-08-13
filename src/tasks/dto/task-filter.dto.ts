import { TaskStatus } from "src/shared/enums/task-status.enum";

export class TaskFilterDTO {
  readonly status: TaskStatus;
  readonly search: string;
}