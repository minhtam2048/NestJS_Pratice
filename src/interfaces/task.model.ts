import { Document } from 'mongoose';
import { TaskStatus } from '../shared/enums/task-status.enum';
import { Comment } from './comment.model';


export interface Task extends Document {
  readonly title: String;
  readonly description: String;
  readonly status: TaskStatus;
  readonly user: string;
  readonly comments: Comment[];
}

