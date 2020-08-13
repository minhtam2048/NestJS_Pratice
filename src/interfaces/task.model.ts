import { Document } from 'mongoose';
import { TaskStatus } from '../shared/enums/task-status.enum';

export interface Task extends Document {
  readonly title: String;
  readonly description: String;
  readonly status: TaskStatus
}

