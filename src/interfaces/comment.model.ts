import { Document } from 'mongoose';

export class Comment extends Document {
  readonly user_id: string;
  readonly content: string;
  readonly date: Date;
}