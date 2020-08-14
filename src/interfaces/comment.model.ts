import { User } from "./user.model";

export class Comment extends Document {
  readonly user: User;
  readonly text: String;
  readonly date: Date;
}